<?php
if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_geotest2',
		'title' => 'geotest2',
		'fields' => array (
			array (
				'key' => 'field_53fde7b3c7f07',
				'label' => 'Geotest',
				'name' => 'geotest',
				'type' => 'flexible_content',
				'layouts' => array (
					array (
						'label' => 'Places',
						'name' => 'places',
						'display' => 'row',
						'min' => '',
						'max' => '',
						'sub_fields' => array (
							array (
								'key' => 'field_53fde7cbc7f08',
								'label' => 'name',
								'name' => 'name',
								'type' => 'text',
								'required' => 1,
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'none',
								'maxlength' => '',
							),
							array (
								'key' => 'field_53fde7e0c7f09',
								'label' => 'question',
								'name' => 'question',
								'type' => 'text',
								'required' => 1,
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'none',
								'maxlength' => '',
							),
							array (
								'key' => 'field_53fde7ebc7f0a',
								'label' => 'coords',
								'name' => 'coords',
								'type' => 'google_map',
								'required' => 1,
								'column_width' => '',
								'center_lat' => '',
								'center_lng' => '',
								'zoom' => '',
								'height' => '',
							),
						),
					),
				),
				'button_label' => 'add spot and question',
				'min' => '',
				'max' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'page',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'no_box',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}

