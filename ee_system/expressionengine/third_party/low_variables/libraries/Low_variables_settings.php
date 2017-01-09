<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Low Variables Settings class
 *
 * @package        low_variables
 * @author         Lodewijk Schutte <hi@gotolow.com>
 * @link           http://gotolow.com/addons/low-variables
 * @copyright      Copyright (c) 2009-2015, Low
 */
class Low_variables_settings {

	// --------------------------------------------------------------------
	// PROPERTIES
	// --------------------------------------------------------------------

	/**
	 * Settings
	 *
	 * @access     private
	 * @var        array
	 */
	private $_settings = array();

	/**
	 * Default settings
	 *
	 * @var        array
	 * @access     private
	 */
	private $_default_settings = array(
		'license_key'          => '',
		'can_manage'           => array(1),
		'clear_cache'          => 'n',
		'register_globals'     => 'n',
		'register_member_data' => 'n',
		'save_as_files'        => 'n',
		'file_path'            => '',
		'one_way_sync'         => 'n',
		'enabled_types'        => array(LOW_VAR_DEFAULT_TYPE)
	);

	/**
	 * Custom config settings
	 *
	 * @var        array
	 * @access     private
	 */
	private $_cfg = array(
		'license_key',
		'save_as_files',
		'file_path',
		'one_way_sync'
	);

	// --------------------------------------------------------------------
	// METHODS
	// --------------------------------------------------------------------

	/**
	 * Set the settings
	 */
	public function set($settings)
	{
		$this->_settings = array_merge($this->_default_settings, $settings);

		$this->_config_overrides();
	}

	// --------------------------------------------------------------------

	/**
	 * Magic getter
	 */
	public function __get($str)
	{
		return $this->get($str);
	}

	// --------------------------------------------------------------------

	/**
	 * Get setting
	 */
	public function get($key = NULL)
	{
		if (empty($this->_settings))
		{
			// Not set yet? Get from DB and add to cache
			$query = ee()->db
				->select('settings')
				->from('extensions')
				->where('class', 'Low_variables_ext')
				->limit(1)
				->get();

			$this->_settings = (array) @unserialize($query->row('settings'));

			$this->_config_overrides();
		}

		// Always fallback to default settings
		$this->_settings = array_merge($this->_default_settings, $this->_settings);

		return is_null($key)
			? $this->_settings
			: (isset($this->_settings[$key]) ? $this->_settings[$key] : NULL);
	}

	// --------------------------------------------------------------------

	/**
	 * Apply Config overrides to $this->settings
	 *
	 * @access     protected
	 * @return     void
	 */
	private function _config_overrides()
	{
		// Check custom config values
		foreach ($this->_cfg AS $key)
		{
			// Check the config for the value
			$val = ee()->config->item('low_variables_'.$key);

			// If not FALSE, override the settings
			if ($val !== FALSE)
			{
				$this->_settings[$key] = $val;
			}
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Is current user a variable manager?
	 *
	 * @access     public
	 * @return     bool
	 */
	public function can_manage()
	{
		return in_array(ee()->session->userdata('group_id'), $this->get('can_manage'));
	}

}
// End of file Low_variables_settings.php