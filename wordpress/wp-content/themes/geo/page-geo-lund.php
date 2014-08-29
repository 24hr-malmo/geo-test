
<?php 

    $page = new stdClass();
    $spot = array();
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
    $page->pages = get_post(62);

    $placemap = get_field('geotest',62);

    foreach ($placemap as $place) {
        $pin = new stdClass();
        $pin->title = get_the_title(62);
        $pin->id = "geo-item-".$index;
        $pin->name = $place["name"];
        $pin->question = $place["question"];
        $pin->coords = new stdClass();
        $pin->coords->lat = $place["coords"]["lat"];
        $pin->coords->long = $place["coords"]["lng"];
        
        array_push($spot, $pin);
        $index++;
    }   

    send_json($spot);