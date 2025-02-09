<?php
    $response = array();
    $response['response'] = "";
    // $url = 'http://raspnellzero2w.local:8000/interactive_resume';

    $url = 'http://localhost:8000/interactive_resume';

    $payload = file_get_contents('php://input');
    
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => $payload,
        ],
    ];
    
    $context = stream_context_create($options);
    
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        throw new Exception('Falha na requisicao ao servidor Flask');
    }

    $response_data = json_decode($result, true);   
    $response['response'] =  $response_data['response'] ; 
                    
    header('Content-Type: application/json');
    echo json_encode($response);
?>
