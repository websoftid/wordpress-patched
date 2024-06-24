<?php

namespace WP_Statistics\Service\Admin\Devices;

use WP_Statistics\Abstracts\MultiViewPage;
use WP_Statistics\Service\Admin\Devices\Views\SingleBrowserView;
use WP_Statistics\Service\Admin\Devices\Views\SingleModelView;
use WP_Statistics\Service\Admin\Devices\Views\SinglePlatformView;
use WP_Statistics\Service\Admin\Devices\Views\TabsView;

class DevicesPage extends MultiViewPage
{
    protected $pageSlug    = 'devices';
    protected $defaultView = 'tabs';
    protected $views       = [
        'tabs'            => TabsView::class,
        'single-browser'  => SingleBrowserView::class,
        'single-platform' => SinglePlatformView::class,
        'single-model'    => SingleModelView::class,
    ];

    public function __construct()
    {
        parent::__construct();
    }

    protected function init()
    {
        $this->disableScreenOption();
    }
}
