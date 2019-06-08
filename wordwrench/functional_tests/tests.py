from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time

class NewUserTest(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(NewUserTest, cls).setUpClass()
        options = Options()
        options.headless = True
        cls.selenium = webdriver.Firefox(options=options)

    def test_nothing(self):
        time.sleep(3)
        self.assertTrue(True)
