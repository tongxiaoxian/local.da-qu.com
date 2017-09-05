<?php
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 */

/*
 * --------------------------------------------------------------------
 *  System Path
 * --------------------------------------------------------------------
 *
 * The following variable contains the server path to your
 * ExpressionEngine "system" folder.  By default the folder is named
 * "system" but it can be renamed or moved for increased security.
 * Indicate the new name and/or path here. The path can be relative
 * or it can be a full server path.
 *
 * http://ellislab.com/expressionengine/user-guide/installation/best_practices.html
 * 
 */
	$system_path = '../../ee_system';


/*
 * --------------------------------------------------------------------
 *  Multiple Site Manager
 * --------------------------------------------------------------------
 *
 * Uncomment the following variables if you are using the Multiple
 * Site Manager: http://ellislab.com/expressionengine/user-guide/cp/sites
 *
 * Set the Short Name of the site this file will display, the URL of
 * this site's admin.php file, and the main URL of the site (without
 * index.php) 
 *
 */
   $assign_to_config['site_name']  = 'leavebehindtheworld'; 
   $assign_to_config['cp_url'] = 'http://www.leavebehindtheworld.com/admin.php'; 
   $assign_to_config['site_url'] = 'http://www.leavebehindtheworld.com/'; 


/*
 * --------------------------------------------------------------------
 *  Error Reporting
 * --------------------------------------------------------------------
 *
 * PHP and database errors are normally displayed dynamically based
 * on the authorization level of each user accessing your site.  
 * This variable allows the error reporting system to be overridden, 
 * which can be useful for low level debugging during site development, 
 * since errors happening before a user is authenticated will not normally 
 * be shown.  Options:
 *
 *	$debug = 0;  Default setting. Errors shown based on authorization level
 *
 *	$debug = 1;  All errors shown regardless of authorization
 *
 * NOTE: Enabling this override can have security implications.
 * Enable it only if you have a good reason to.
 * 
 */
	$debug = 0;

/*
 * --------------------------------------------------------------------
 *  CUSTOM CONFIG VALUES
 * --------------------------------------------------------------------
 *
 * The $assign_to_config array below will be passed dynamically to the
 * config class. This allows you to set custom config items or override
 * any default config values found in the config.php file.  This can
 * be handy as it permits you to share one application between more then
 * one front controller file, with each file containing different 
 * config values.
 *
 * Un-comment the $assign_to_config array below to use this feature
 *
 * NOTE: This feature can be used to run multiple EE "sites" using
 * the old style method.  Instead of individual variables you'll
 * set array indexes corresponding to them.
 *
 */

$assign_to_config['site_url'] = "http://www.leavebehindtheworld.com/";

$assign_to_config['tmpl_file_basepath'] = '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/templates';

$assign_to_config['upload_preferences'] = array(           
    1 => array(                                                            // ID of upload destination
        'name'        => 'photography',                          // Display name in control panel
        'server_path' => '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/assets/images/uploads/photography/', // Server path to upload directory
        'url'         => 'http://www.leavebehindtheworld.com/assets/images/uploads/photography/'      // URL of upload directory
    ),
    2 => array(                                                            // ID of upload destination
        'name'        => 'text',                          // Display name in control panel
        'server_path' => '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/assets/images/uploads/text/', // Server path to upload directory
        'url'         => 'http://www.leavebehindtheworld.com/assets/images/uploads/text/'      // URL of upload directory
    ),
    3 => array(                                                            // ID of upload destination
        'name'        => 'treatment',                          // Display name in control panel
        'server_path' => '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/assets/images/uploads/treatment/', // Server path to upload directory
        'url'         => 'http://www.leavebehindtheworld.com/assets/images/uploads/treatment/'      // URL of upload directory
    ),
    4 => array(                                                            // ID of upload destination
        'name'        => 'about',                          // Display name in control panel
        'server_path' => '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/assets/images/uploads/about/', // Server path to upload directory
        'url'         => 'http://www.leavebehindtheworld.com/assets/images/uploads/about/'      // URL of upload directory
    )
);

//	$assign_to_config['template_group'] = '';
//	$assign_to_config['template'] = '';
//	$assign_to_config['site_index'] = '';
//	$assign_to_config['site_404'] = '';
//	$assign_to_config['global_vars'] = array(); // This array must be associative


/*
 * --------------------------------------------------------------------
 *  END OF USER CONFIGURABLE SETTINGS.  DO NOT EDIT BELOW THIS LINE
 * --------------------------------------------------------------------
 */


/*
 * ---------------------------------------------------------------
 *  Disable all routing, send everything to the frontend
 * ---------------------------------------------------------------
 */
	$routing['directory'] = '';
	$routing['controller'] = 'ee';
	$routing['function'] = 'index';

/*
 * --------------------------------------------------------------------
 *  Mandatory config overrides
 * --------------------------------------------------------------------
 */
	$assign_to_config['subclass_prefix'] = 'EE_';

/*
 * --------------------------------------------------------------------
 *  Resolve the system path for increased reliability
 * --------------------------------------------------------------------
 */

	if (realpath($system_path) !== FALSE)
	{
		$system_path = realpath($system_path).'/';
	}

	// ensure there's a trailing slash
	$system_path = rtrim($system_path, '/').'/';

	// Is the sytsem path correct?
	if ( ! is_dir($system_path))
	{
		exit("Your system folder path does not appear to be set correctly. Please open the following file and correct this: ".pathinfo(__FILE__, PATHINFO_BASENAME));
	}

/*
 * --------------------------------------------------------------------
 *  Now that we know the path, set the main constants
 * --------------------------------------------------------------------
 */	
	// The name of THIS file
	define('SELF', pathinfo(__FILE__, PATHINFO_BASENAME));

	// The PHP file extension
	define('EXT', '.php');

 	// Path to the system folder
	define('BASEPATH', str_replace("\\", "/", $system_path.'codeigniter/system/'));
	
	// Path to the "application" folder
	define('APPPATH', $system_path.'expressionengine/');
	
	// Path to the front controller (this file)
	define('FCPATH', str_replace(SELF, '', __FILE__));
	
	// Name of the "system folder"
	define('SYSDIR', trim(strrchr(trim(str_replace("\\", "/", $system_path), '/'), '/'), '/'));

	// The $debug value as a constant for global access
	define('DEBUG', $debug);  unset($debug);

/*
 * --------------------------------------------------------------------
 *  Set the error reporting level
 * --------------------------------------------------------------------
 */	
	if (DEBUG == 1)
	{
		error_reporting(E_ALL);
		@ini_set('display_errors', 1);
	}
	else
	{
		error_reporting(0);	
	}

/*
 *---------------------------------------------------------------
 * LOAD THE BOOTSTRAP FILE
 *---------------------------------------------------------------
 *
 * And away we go...
 *
 */
	require_once BASEPATH.'core/CodeIgniter'.EXT;

/* End of file index.php */
/* Location: ./index.php */

$config['minimee'] = array(
 
    /**
     * ==============================================
     * BASIC PREFERENCES (REQUIRED)
     * ==============================================
     */
 
    /**
     * The path to the cache folder.
     * Defaults to site's FCPATH + '/cache'
     */
    'cache_path'        => '/var/www/html/tongxiaoxian.com/msm/leavebehindtheworld.com/cache',
 
    /**
     * The URL to the cache folder.
     * Defaults to $EE->config->item('base_url') + '/cache'
     */
    'cache_url'         => 'http://www.leavebehindtheworld.com/cache',
 
    /**
     * ==============================================
     * BASIC PREFERENCES (OPTIONAL)
     * ==============================================
     */
 
    /**
     * Turn on or off combining of CSS assets only. 'yes' or 'no'.
     * Values: 'yes' or 'no'
     * Default: yes
     */
    'combine_css'       => 'yes',
 
    /**
     * Turn on or off combining of JS assets only. 'yes' or 'no'.
     * Values: 'yes' or 'no'
     * Default: yes
     */
    'combine_js'        => 'yes',
 
    /**
     * Turn on or off minifying of CSS assets. 'yes' or 'no'.
     * Values: 'yes' or 'no'
     * Default: yes
     */
    'minify_css'        => 'yes',
 
    /**
     * Turn on or off minifying of the template HTML.
     * Values: 'yes' or 'no'
     * Default: no
     */
    'minify_html'       => 'no',
 
    /**
     * Turn on or off minifying of JS assets.
     * Values: 'yes' or 'no'
     * Default: yes
     */
    'minify_js'         => 'yes',
 
 
    /**
     * ==============================================
     * DISABLING MINIMEE
     * ==============================================
     */
 
    /**
     * Disable Minimee entirely; aborts all activity
     * and returns all tags untouched.
     * Values: 'yes' or 'no'
     * Default: no
     */
    'disable'           => 'no',
 
 
    /**
     * ==============================================
     * ADVANCED PREFERENCES
     * It is recommended to not specify these unless
     * you are intending to override their default values.
     * ==============================================
     */
 
    /**
     * The base path of your local source assets.
     * Defaults to site's FCPATH
     */
    'base_path'         => '/path/to/site.com',
 
    /**
     * The base URL of your local source assets.
     * Defaults to $EE->config->item('base_url')
     */
    'base_url'          => 'http://site.com',
 
    /**
     * An optional unique 'cachebusting' string to force
     * Minimee to generate a new cache whenever updated.
     */
    'cachebust'         => '',
 
    /**
     * When 'yes', Minimee will attempt to delete caches
     * it has determined to have expired.
     * Values: 'yes' or 'no'
     * Default: no
     */
    'cleanup'       => 'no',
 
    /**
     * Specify which minification library to use for your CSS.
     * Values: 'minify' or 'cssmin'
     * Default: minify
     */
    'css_library'   => 'minify',
 
    /**
     * Whether or not to prepend the base URL to relative
     * @import and image paths in CSS. 'yes' or 'no'.
     * Values: 'yes' or 'no'
     * Default: yes
     */
    'css_prepend_mode'  => 'yes',
 
    /**
     * Override the URL used when prepending URL to relative
     * @import and image paths in CSS.
     * Defaults to Base URL.
     */
    'css_prepend_url'   => 'http://site.com',
 
    /**
     * Specify what algorithm to use when creating cache filenames.
     * 'sanitize' enforces a 200 character limit, and is
     * only recommended during development.
     * Values: 'md5', 'sha1', or 'sanitize'/'sanitise'
     * Default: sha1
     */
    'hash_method'   => 'sha1',
 
    /**
     * Specify which minification library to use for your JS.
     * Please note that JSMinPlus is VERY memory-intensive. Not recommended
     * unless you really know what you're doing. Seriously.
     *
     * Values: 'jsmin' or 'jsminplus'
     * Default: jsmin
     */
    'js_library'    => 'jsmin',
 
    /**
     * Specify the method with which Minimee should fetch external & {stylesheet=} assets.
     * Values: 'auto', 'fgc', or 'curl'
     * Default: auto
     */
    'remote_mode'       => 'auto'
);