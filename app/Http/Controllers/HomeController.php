<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('home/Index', []);
    }

    public function readMore()
    {
        return Inertia::render('home/ReadMore');
    }
}
