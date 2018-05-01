<?php
use Illuminate\Http\Response;

class ExampleTest extends TestCase
{
  
    
    /** @test **/
    public function ping_v1_returns_200_status_code()
    {
        $response = $this->get('/api/ping',['Accept'=>'application/x.readings.v1+json'])->seeStatusCode(Response::HTTP_OK); 
    }

    /** @test **/
    public function ping_v2_returns_200_status_code()
    {
        $response = $this->get('/api/ping',['Accept'=>'application/x.readings.v2+json'])->seeStatusCode(Response::HTTP_OK); 
    }
   
  
    public function ping_v1_shoud_returns_text_ping_v1(){
    $this->$this->get('/api/ping',['Accept'=>'application/x.readings.v1+json']);
  
    $this->assertEquals('ping v1', $this->response->getContent());
            
   }


}