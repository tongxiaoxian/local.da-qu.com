<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Low Variables Types Class
 *
 * Loads up Low Variables types
 *
 * @package        low_variables
 * @author         Lodewijk Schutte <hi@gotolow.com>
 * @link           http://gotolow.com/addons/low-variables
 * @copyright      Copyright (c) 2009-2015, Low
 */

class Low_variables_types {

	/**
	 * Loaded types
	 */
	private $_types = array();

	// --------------------------------------------------------------------

	/**
	 * Get array of Variable Types
	 *
	 * This method can be called directly throughout the package with $this->get_types()
	 *
	 * @param	mixed	$which		FALSE for complete list or array containing which types to get
	 * @return	array
	 */
	public function load()
	{
		$which = ee()->low_variables_settings->allowed_types;

		// -------------------------------------
		// Load parent classes
		// -------------------------------------

		if ( ! class_exists('Low_variables_type'))
		{
			include_once PATH_THIRD.'low_variables/type.low_variables.php';
		}

		if ( ! class_exists('Low_fieldtype_bridge'))
		{
			include_once PATH_THIRD.'low_variables/bridge.low_variables.php';
		}

		// -------------------------------------
		//  Set variable types path
		// -------------------------------------

		$types_path = PATH_THIRD.'low_variables/types/';

		// -------------------------------------
		//  If path is not valid, bail
		// -------------------------------------

		if ( ! is_dir($types_path) ) return;

		// -------------------------------------
		//  Read dir, create instances
		// -------------------------------------

		$dir = opendir($types_path);

		while (($type = readdir($dir)) !== FALSE)
		{
			// skip these
			if ($type == '.' || $type == '..' || !is_dir($types_path.$type)) continue;

			// if given, only get the given ones
			if (is_array($which) && ! in_array($type, $which)) continue;

			// determine file name
			$file = 'vt.'.$type.'.php';
			$path = $types_path.$type.'/';

			if ( ! class_exists($type) && file_exists($path.$file) )
			{
				include($path.$file);
			}

			// Got class? Get its details without instantiating it
			if (class_exists($type))
			{
				$vars = get_class_vars($type);

				// Check requirements
				$reqs = isset($vars['info']['var_requires']) ? $vars['info']['var_requires'] : array();

				if ($this->_check_requirements($reqs))
				{
					$this->_types[$type] = array(
						'path'         => $path,
						'file'         => $file,
						'name'         => (isset($vars['info']['name']) ? $vars['info']['name'] : $type),
						'class'        => ucfirst($type),
						'version'      => (isset($vars['info']['version']) ? $vars['info']['version'] : ''),
						'is_default'   => ($type == LOW_VAR_DEFAULT_TYPE),
						'is_fieldtype' => FALSE
					);
				}
			}
		}

		// clean up
		closedir($dir);
		unset($dir);

		// -------------------------------------
		//  Get fieldtypes
		// -------------------------------------

		ee()->load->library('addons');

		foreach (ee()->addons->get_installed('fieldtypes') AS $package => $ftype)
		{
			// if given, only get the given ones
			if (is_array($which) && ! in_array($ftype['class'], $which) && ! in_array($package, $which)) continue;

			// Include EE Fieldtype class
			if ( ! class_exists('EE_Fieldtype'))
			{
				include_once (APPPATH.'fieldtypes/EE_Fieldtype.php');
			}

			if ( ! class_exists($ftype['class']) && file_exists($ftype['path'].$ftype['file']))
			{
				include_once ($ftype['path'].$ftype['file']);
			}

			// Check if fieldtype is compatible
			if (method_exists($ftype['class'], 'display_var_field'))
			{
				$vars = get_class_vars($ftype['class']);

				// Check requirements
				$reqs = isset($vars['info']['var_requires']) ? $vars['info']['var_requires'] : array();

				if ($this->_check_requirements($reqs))
				{
					$this->_types[$ftype['name']] = array(
						'path'         => $ftype['path'],
						'file'         => $ftype['file'],
						'name'         => (isset($vars['info']['name']) ? $vars['info']['name'] : $ftype['name']),
						'class'        => $ftype['class'],
						'version'      => $ftype['version'],
						'is_default'   => ($type == LOW_VAR_DEFAULT_TYPE),
						'is_fieldtype' => TRUE
					);
				}
			}
		}

		// Sort types by alpha
		uasort($this->_types, create_function(
			'$a, $b',
			'return strcasecmp($a["name"], $b["name"]);'
		));

		return $this->_types;
	}

	// --------------------------------------------------------------------

	/**
	 * Validate variable type requirements
	 *
	 * @access     private
	 * @param      array
	 * @return     bool
	 */
	private function _check_requirements($reqs)
	{
		// Reqs met?
		$met = TRUE;

		// Loop through reqs and check 'em
		foreach ($reqs AS $package => $version_needed)
		{
			// Initiate installed version
			$installed_version = '0.0.0';

			// Check EE itself
			if ($package == 'ee')
			{
				$installed_version = APP_VER;
			}
			// Check packages
			else
			{
				// Get version for given package
				$types = array(
					'modules'    => 'module_version',
					'fieldtypes' => 'version',
					'extensions' => 'version'
				);

				// Loop through types and get the version number
				foreach ($types AS $type => $key)
				{
					$rows = ee()->addons->get_installed($type);

					if (array_key_exists($package, $rows))
					{
						$installed_version = $rows[$package][$key];
						break;
					}
				}
			}

			// Compare the versions
			if (version_compare($installed_version, $version_needed, '<'))
			{
				$met = FALSE;
				break;
			}
		}

		return $met;
	}

	// --------------------------------------------------------------------

	/**
	 * Is given type a valid type?
	 *
	 * @param	string
	 * @return	bool
	 */
	public function is_type($str)
	{
		return array_key_exists($str, $this->_types);
	}

	// --------------------------------------------------------------------

	/**
	 * Get given type, optionally as an object
	 *
	 * @param	string
	 * @return	bool
	 */
	public function get($str, $obj = FALSE)
	{
		if ( ! $this->is_type($str)) $str = LOW_VAR_DEFAULT_TYPE;

		// Get this type's details
		$type = $this->_types[$str];

		// Convert to object?
		if ($obj && class_exists($type['class']))
		{
			if ($type['is_fieldtype'])
			{
				$path = $type['path'];

				ee()->load->add_package_path($path);
				$type = new Low_fieldtype_bridge($type);
				ee()->load->remove_package_path($path);
			}
			else
			{
				$type = new $type['class'];
			}
		}

		return $type;
	}

}