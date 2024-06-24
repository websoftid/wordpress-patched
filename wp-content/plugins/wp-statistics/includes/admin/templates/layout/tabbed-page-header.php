<div class="wps-wrap__top tabbed_page">
    <h2 class="wps_title">
        <span><?php echo(isset($title) ? esc_html($title) : (function_exists('get_admin_page_title') ? esc_html(get_admin_page_title()) : '')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
        <?php if (!empty($tooltip)) : ?>
            <span class="wps-tooltip" title="<?php echo esc_attr($tooltip); ?>"><i class="wps-tooltip-icon info"></i></span>
        <?php endif; ?>
    </h2>

    <?php if (!empty($description)) echo '<p class="wps_description">' . esc_html($description) . '</p>'    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped	?>

    <?php do_action('wp_statistics_after_admin_page_title'); ?>
    <div class="wp-clearfix"></div>
    <?php if (isset($hasDateRang) || isset($filters)): ?>
        <div class="wps-head-filters">
            <?php
            if (!empty($hasDateRang)) {
                include 'date.range.php';
            }

            if (!empty($filters)) {
                foreach ($filters as $filter) {
                    require_once "filters/$filter-filter.php";
                }
            }
            ?>
        </div>
    <?php endif; ?>
    <?php if (!empty($tabs) && is_array($tabs)) { ?>
        <ul class="wps-tabs">
            <?php foreach ($tabs as $tab) { ?>
                <li class="wps-tab-link <?php echo esc_attr($tab['class']); ?>">
                    <?php if (isset($tab['coming_soon'])): ?>
                        <span class="wps-tooltip wps-tooltip--coming_soon" title="<?php echo esc_html__('Coming soon', 'wp-statistics') ?>"><?php echo esc_html($tab['title']); ?> <i class="wps-tooltip-icon coming-soon"></i></span>
                     <?php else: ?>
                        <a href="<?php echo esc_attr($tab['link']); ?>">
                            <?php echo esc_html($tab['title']); ?>
                            <?php if (!empty($tab['tooltip'])) : ?>
                                <span class="wps-tooltip" title="<?php echo esc_attr($tab['tooltip']); ?>"><i class="wps-tooltip-icon info"></i></span>
                            <?php endif; ?>
                        </a>
                    <?php endif; ?>
                </li>
            <?php } ?>
        </ul>
    <?php } ?>
</div>
<div class="wps-wrap__main">
    <div class="wp-header-end"></div>