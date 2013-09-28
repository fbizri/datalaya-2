<?php
//TODO: metatags or getlementbytag name is returning returns wanings
error_reporting(0);

    if (!isset($_GET['url'])) die();
    $url = urldecode($_GET['url']);
    $url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system
    $link = file_get_contents($url);

    $dom = new DOMDocument;
	$dom->loadHTML($link);
	
	// returns an array of metadata
	echo returnMetadata($dom, $url);
	

	function returnMetadata ($domFrag, $url) {
		
		$result = array();
		//find title, if any
		$title = $domFrag->getElementsByTagName('title');
		if ($title->length == 0) {
			$result[] = "No title found";
		}
		else {
		    for( $i=0; $i < $title->length; $i++){
		       $cn = $title->item($i);
		       
		       //if node is of type Element, get its value then get out
		       if( $cn->nodeType == 1){
		        	$result["title"] = $cn->nodeValue;
		       	break;
		        }
		    }
		}

		$tags = get_meta_tags($url);

		$result = array_merge($result, $tags);

	    return json_encode($result);
	}
	
?>