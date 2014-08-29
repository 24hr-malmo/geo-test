
<?php 

    $page = new stdClass();
    $pins = array();
    $spin = array();

    $args = array(
        'sort_order' => 'ASC',
        'sort_column' => 'post_title',
        'hierarchical' => 1,
        'exclude' => '',
        'include' => '',
        'meta_key' => '',
        'meta_value' => '',
        'authors' => '',
        'child_of' => 0,
        'parent' => -1,
        'exclude_tree' => '',
        'number' => '',
        'offset' => 0,
        'post_type' => 'page',
        'post_status' => 'publish'
    ); 

    $index = 1;
    $page->pages = get_posts($args);
    $page->sites = array();
    
   
  foreach ($page->pages as $geopage) {
        //$siteName = get_the_title($geopage->ID);
        $siteName = $geopage->post_name;
        $placemap[$siteName] = get_field('geotest',$geopage->ID);
        $spot = array();

        foreach ($placemap[$siteName] as $place) {

            $pin = new stdClass();
            $pin->title = get_the_title($geopage->ID);
            $pin->id = "geo-item-".$index;
            $pin->name = $place["name"];
            $pin->question = $place["question"];
            $pin->coords = new stdClass();
            $pin->coords->lat = $place["coords"]["lat"];
            $pin->coords->long = $place["coords"]["lng"];
            array_push($spot, $pin);

            $index++;

        }  
        array_push($spin, $placemap);
        $page->sites[ $siteName] = $spot;
    }
    //send_json($page->pages);
    send_json($page->sites);
