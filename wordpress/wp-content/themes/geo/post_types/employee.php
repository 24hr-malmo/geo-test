<?php

    $labels = array(
        'name'                => _x( 'Employees', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Employee', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Employee', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent employee:', 'text_domain' ),
        'all_items'           => __( 'All Employees', 'text_domain' ),
        'view_item'           => __( 'View employee', 'text_domain' ),
        'add_new_item'        => __( 'Add New employee', 'text_domain' ),
        'add_new'             => __( 'New employee', 'text_domain' ),
        'edit_item'           => __( 'Edit employee', 'text_domain' ),
        'update_item'         => __( 'Update employee', 'text_domain' ),
        'search_items'        => __( 'Search employees', 'text_domain' ),
        'not_found'           => __( 'No employees found', 'text_domain' ),
        'not_found_in_trash'  => __( 'No employees found in Trash', 'text_domain' ),
    );

    $args = array(
        'label'               => __( 'employee', 'text_domain' ),
        'description'         => __( 'employee information pages', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( ),
        'taxonomies'          => array( ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
    );

    register_post_type( 'employee', $args );

