<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
  public function upload(Request $request)
  {
			if ($request->hasFile('file')) {
    		// Get the file from the request
    		$file = $request->file('file');

    		// Store the file in the csv-files fodler.
    		$path = $file->store('csv-files');

				return response()->json(['path' => $path], 200);
			}

			return response()->json(['error' => 'No file uploaded'], 400);
	}
	public function uploadTest(Request $request)
	{
		return response()->json(['success' => 'lmao'], 200);
	}


}
