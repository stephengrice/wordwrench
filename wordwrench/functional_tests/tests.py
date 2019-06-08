from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time

class NewUserTests(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(NewUserTests, cls).setUpClass()
        cls.selenium = webdriver.Chrome()

    def test_nothing(self):
        print('hello')
        time.sleep(3)
        self.assertTrue(True)
