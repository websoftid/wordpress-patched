<?php

use WP_STATISTICS\Admin_Template;

$isCustomizationActive = WP_STATISTICS\Helper::isAddOnActive('customization');
global $wp_version;

$disableMenuArray = array(
    'overview'     => __('Overview', 'wp-statistics'),
    'hits'         => __('Views', 'wp-statistics'),
    'online'       => __('Online', 'wp-statistics'),
    'visitors'     => __('Visitors', 'wp-statistics'),
    'referrers'    => __('Referrers', 'wp-statistics'),
    'searches'     => __('Search Engines', 'wp-statistics'),
    'pages'        => __('Pages', 'wp-statistics'),
    'taxonomies'   => __('Taxonomies', 'wp-statistics'),
    'browsers'     => __('Browsers', 'wp-statistics'),
    'platforms'    => __('Operating Systems', 'wp-statistics'),
    'top.visitors' => __('Top Visitors Today', 'wp-statistics')
);

$disabledMenuItems = WP_STATISTICS\Option::getByAddon('disable_menus', 'customization', []);
?>
<?php
if (!$isCustomizationActive) echo Admin_Template::get_template('layout/partials/addon-premium-feature',
    ['addon_slug'           => esc_url(WP_STATISTICS_SITE_URL . '/product/wp-statistics-customization/?utm_source=wp-statistics&utm_medium=link&utm_campaign=plugin-settings'),
     'addon_title'          => 'Customization Add-On',
     'addon_description'    => 'The settings on this page are part of the Customization add-on, which allows you to permanently disable ads on the Overview, and Settings pages, customize menus, and make your product white-label by changing the plugin header.',
     'addon_features'       => [
         'Permanently disable ads on pages.',
         'Customize menus according to your preferences.',
         'Make your product white-label by modifying the plugin header.',
     ],
     'addon_info'           => 'Enjoy a simplified and ad-free experience with the Customization add-on.',
    ], true);
?>
    <div class="postbox">
        <table class="form-table <?php echo !$isCustomizationActive ? 'form-table--preview' : '' ?>">
            <tbody>
            <tr valign="top">
                <th scope="row" colspan="2"><h3><?php esc_html_e('Manage Admin Menus', 'wp-statistics'); ?></h3></th>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][disable_menus]"><?php esc_html_e('Disable Menus', 'wp-statistics'); ?></label>
                </th>

                <td>
                    <select name="wps_addon_settings[customization][disable_menus][]" id="wps_addon_settings[customization][disable_menus]" multiple>
                        <?php foreach ($disableMenuArray as $key => $title) { ?>
                            <option value="<?php echo esc_attr($key) ?>" <?php echo in_array($key, $disabledMenuItems ? $disabledMenuItems : []) ? 'selected' : '' ?>><?php echo esc_html($title) ?></option>
                        <?php } ?>
                    </select>
                    <p class="description"><?php esc_html_e('Choose which menus you want to remove from the WordPress sidebar.', 'wp-statistics'); ?></p>
                </td>
            </tr>

            </tbody>
        </table>
    </div>

    <div class="postbox">
        <table class="form-table <?php echo !$isCustomizationActive ? 'form-table--preview' : '' ?>">
            <tbody>
            <tr valign="top">
                <th scope="row" colspan="2"><h3><?php esc_html_e('White label and Header Customization', 'wp-statistics'); ?></h3></th>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][wps_white_label]"><?php esc_html_e('White label', 'wp-statistics'); ?></label>
                </th>

                <td>
                    <input id="wps_addon_settings[customization][wps_white_label]" type="checkbox" value="1" name="wps_addon_settings[customization][wps_white_label]" <?php checked(WP_STATISTICS\Option::getByAddon('wps_white_label', 'customization')) ?>>
                    <label for="wps_addon_settings[customization][wps_white_label]"><?php esc_html_e('Enable', 'wp-statistics'); ?></label>
                    <p class="description"><?php esc_html_e('White label WP Statistics report pages. Remove branding and promotional elements. For a detailed list of changes, refer to the White label Documentation.', 'wp-statistics'); ?></p>
                </td>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][wps_modify_banner]"><?php esc_html_e(' Change the Header Logo', 'wp-statistics'); ?></label>
                </th>

                <?php
                $custom_header_logo = esc_attr(stripslashes(WP_STATISTICS\Option::getByAddon('wps_modify_banner', 'customization')));
                $default_logo_url   = WP_STATISTICS_URL . 'assets/images/logo-statistics-header-blue.png';
                $header_logo_url    = !empty($custom_header_logo) ? $custom_header_logo : $default_logo_url;
                $display_clear      = !empty($custom_header_logo) ? "" : "display: none;";

                wp_enqueue_media();
                ?>
                <script>
                    var wps_ar_vars = {
                        'default_avatar_url': "<?php echo esc_url($default_logo_url); ?>"
                    }
                </script>
                <td>
                    <div class='wps-img-preview-wrapper'><img style="max-width: 300px; max-height: 200px;" id='wps-upload-image-preview' src='<?php echo esc_attr($header_logo_url) ?>' alt="Header Logo"></div>
                    <input id="wps_addon_settings[customization][wps_modify_banner]" name="wps_addon_settings[customization][wps_modify_banner]" type="text" class="regular-text" value="<?php echo $custom_header_logo; ?>"/>
                    <span>&nbsp;<input type="button" class="wps_img_settings_upload_button button" value="<?php esc_html_e('Upload File', 'wp-statistics-advanced-reporting') ?>" style="margin: 0; padding-top: 13px; padding-bottom: 13px;"/>&nbsp;<input type="button" class="wps_img_settings_clear_upload_button button" style="<?php echo esc_attr($display_clear); ?> margin: 0; padding-top: 13px; padding-bottom: 13px;" value="<?php esc_html_e('X', 'wp-statistics-advanced-reporting') ?>"/></span>

                    <p class="description"><?php esc_html_e('Customize the header logo to match your branding by uploading your own logo.', 'wp-statistics'); ?></p>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="postbox">
        <table class="form-table <?php echo !$isCustomizationActive ? 'form-table--preview' : '' ?>">
            <tbody>
            <tr valign="top">
                <th scope="row" colspan="2"><h3><?php esc_html_e('Overview Widget Customization', 'wp-statistics'); ?></h3></th>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][show_wps_about_widget_overview]"><?php esc_html_e('Enable Overview Widget', 'wp-statistics'); ?></label>
                </th>

                <td>
                    <select name="wps_addon_settings[customization][show_wps_about_widget_overview]" id="wps_addon_settings[customization][show_wps_about_widget_overview]">
                        <option value="yes" <?php selected(WP_STATISTICS\Option::getByAddon('show_wps_about_widget_overview', 'customization'), 'yes'); ?>><?php esc_html_e('Yes', 'wp-statistics'); ?></option>
                        <option value="no" <?php selected(WP_STATISTICS\Option::getByAddon('show_wps_about_widget_overview', 'customization'), 'no'); ?>><?php esc_html_e('No', 'wp-statistics'); ?></option>
                    </select>
                    <p class="description"><?php esc_html_e('Activate a custom widget on the Overview page.', 'wp-statistics'); ?></p>
                </td>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][wps_about_widget_title]"><?php esc_html_e('Widget Title', 'wp-statistics'); ?></label>
                </th>

                <td>
                    <input dir="ltr" type="text" name="wps_addon_settings[customization][wps_about_widget_title]" id="wps_addon_settings[customization][wps_about_widget_title]" size="30" value="<?php echo esc_attr(WP_STATISTICS\Option::getByAddon('wps_about_widget_title', 'customization')) ?>"/>
                    <p class="description"><?php esc_html_e('Enter a title for your custom widget.', 'wp-statistics'); ?></p>
                </td>
            </tr>

            <tr valign="top">
                <th scope="row">
                    <label for="wps_addon_settings[customization][wps_about_widget_content]"><?php esc_html_e('Widget Content', 'wp-statistics'); ?></label>
                </th>

                <td>
                    <?php if ($wp_version >= 3.3 && function_exists('wp_editor')) { ?>
                        <?php wp_editor(stripslashes(WP_STATISTICS\Option::getByAddon('wps_about_widget_content', 'customization')), 'wps_about_widget_content', array('textarea_name' => 'wps_addon_settings[customization][wps_about_widget_content]', 'editor_height' => 400)); ?>
                    <?php } else { ?>
                        <textarea class="large-text" rows="10" id="wps_addon_settings[customization][wps_about_widget_content]" name="wps_addon_settings[customization][wps_about_widget_content]"><?php echo esc_textarea(stripslashes(WP_STATISTICS\Option::getByAddon('wps_about_widget_content', 'customization'))) ?></textarea>
                    <?php } ?>
                    <p class="description"><?php esc_html_e('Craft the content for your widget; text, images, and HTML are supported.', 'wp-statistics'); ?></p>
                </td>
            </tr>

            </tbody>
        </table>
    </div>

<?php
if ($isCustomizationActive) {
    submit_button(__('Update', 'wp-statistics'), 'primary', 'submit', '', array('OnClick' => "var wpsCurrentTab = getElementById('wps_current_tab'); wpsCurrentTab.value='customization-settings'"));
}
?>