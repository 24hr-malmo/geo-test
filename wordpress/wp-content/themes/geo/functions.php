<?php


################################################################################
#logging
################################################################################

function dump($data){
    echo "<pre>" . print_r($data, true) . "</pre>";
}

function e($data) {
    error_log(print_r($data, true));
}


# helpers

function send_json($data){
    header("content-type: application/json");
    echo json_encode($data);
}



################################################################################
# init
################################################################################

function init() {

    include 'post_types/article.php';
    include 'post_types/project.php';
    include 'post_types/employee.php';
    // acf fields
    include 'acf/fields.php';
}
add_action('init', 'init');

################################################################################
# init
################################################################################