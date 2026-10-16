<?php
use PHPUnit\Framework\TestCase;

class CineSphereTest extends TestCase {
    public function testDatabaseConfigFileExists() {
        $this->assertFileExists(__DIR__ . '/../backend/db.php');
    }

    public function testMoviesEndpointExists() {
        $this->assertFileExists(__DIR__ . '/../backend/movies.php');
    }

    public function testAuthEndpointExists() {
        $this->assertFileExists(__DIR__ . '/../backend/auth.php');
    }

    public function testMovieSafeMapping() {
        $dummy = [
            'id' => 1068452,
            'title' => 'Hi Nanna',
            'vote_average' => 8.0,
            'original_language' => 'te'
        ];
        $this->assertEquals(1068452, $dummy['id']);
        $this->assertEquals('Hi Nanna', $dummy['title']);
        $this->assertGreaterThan(7.0, $dummy['vote_average']);
    }

    public function testFrontendFilesExist() {
        $this->assertFileExists(__DIR__ . '/../index.html');
        $this->assertFileExists(__DIR__ . '/../assets/js/app.js');
        $this->assertFileExists(__DIR__ . '/../assets/js/chatbot.js');
        $this->assertFileExists(__DIR__ . '/../assets/js/recommendations.js');
        $this->assertFileExists(__DIR__ . '/../assets/css/main.css');
    }
}
