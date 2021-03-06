<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        require_once app_path('Helpers/OrderStatusCodeHelper.php');
        require_once app_path('Helpers/PriceHelper.php');
        require_once app_path('Helpers/CommunicationModeHelper.php');
        require_once app_path('Helpers/PaymentStatusHelper.php');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
