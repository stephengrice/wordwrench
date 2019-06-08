from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time

class NewUserTests(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(NewUserTests, cls).setUpClass()
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        cls.selenium = webdriver.Chrome(chrome_options=options)

    def test_nothing(self):
        print('hello')
        time.sleep(3)
        self.assertTrue(True)
