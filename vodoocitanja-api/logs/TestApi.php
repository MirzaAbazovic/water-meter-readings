<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class TestApi extends TestCase
{
    /**
     * Test ping v1.
     *
     * @return void
     */
    public function testPingV1()
    {
        $response =  $this->withHeaders([
            'Accept' => 'application/x.readings.v1+json',
        ])->json('GET', '/api/ping');

        $this->assertEquals(
            'pong v1', $response->getContent()
        );
    }

    
    /**
     * Test ping v2.
     *
     * @return void
     */
    public function testPingV2()
    {
        $response =   $this->withHeaders([
            'Accept' => 'application/x.readings.v2+json',
        ])->json('GET', '/api/ping');

        $this->assertEquals(
            'pong v2', $this->response->getContent()
        );
    }

    
    /**
     * test register user.
     *
     * @return void
     */
    /*
    public function registerUser()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/x.readings.v1+json',
        ])->json('POST', '/auth/register', 
        ['username' => 'admin',
        'email' => 'admin@admin.com',
        'first_name' => 'name',
        'last_name' => 'surname',
        'password' => 'password',
        'role' => 'admin']);

        $response->assertStatus(200);
    }
    */
}
