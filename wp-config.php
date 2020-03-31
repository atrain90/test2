<?php
define('WP_CACHE_KEY_SALT', '617f19fe9c38a9cb3b4d2d584121e6b5');
define('CONCATENATE_SCRIPTS', true);
define('WP_AUTO_UPDATE_CORE', 'minor');// This setting is required to make sure that WordPress updates can be properly managed in WordPress Toolkit. Remove this line if this WordPress website is not managed by WordPress Toolkit anymore.
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_pe8bfaa_bi_investors');
/** MySQL database username */
define('DB_USER', 'wp_4185p');
/** MySQL database password */
define('DB_PASSWORD', 'S8P!63ovsQ');
/** MySQL hostname */
define('DB_HOST', 'localhost:3306');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'YS*j/wb3Kl80Api85wX|ot[G2BDt[4R46~XfcqNK;vl+bBT]9hxW:URCRJI4]V_E');
define('SECURE_AUTH_KEY', '5tK#+nr(s[sXu-V+403_X1MuI~57X|4H~;Tp-_pdE5Gj%(Q83/n8[/k/[K[b:7S[');
define('LOGGED_IN_KEY', '5*0bC*X;4-mmqvf4Gz2/HQ_-@S|94C:u8*p%65U098WA%O8+8L-|zQl49p7r7!iY');
define('NONCE_KEY', 'K3h041#pJ3]%69t~97!aZrA;9d&|!DESg56B5)9P4Nh&_:ET497YW050a%7*a0hm');
define('AUTH_SALT', '1wExQ_~OVW7o:#5~~%m8E]-sZ5|974[ALS[Y[P2p7d;a9aOGC9Uf5zo@4S~wgV]|');
define('SECURE_AUTH_SALT', '+el]57&%15I3F]apSO~N[T36J|9dg09wsr#TQkeNLXf(m56~h5W7uYt/Bx5v*ZJl');
define('LOGGED_IN_SALT', '@VNNz4CKl19x60P@fJp8mH2n6;[jemh_6aHtk3]j)YpK7T[Vl8%w)f*447mK0F++');
define('NONCE_SALT', 'ZLm06W1nPAXhp@Zc!:2L6L0@jVp0/;8:|!K5757U!8ucvqV:/4%z@@lE2h+tZCC~');
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'cZ1iv8lH0e_';
define('WP_ALLOW_MULTISITE', true);
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
