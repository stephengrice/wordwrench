from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time

class NewUserTests(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(NewUserTests, cls).setUpClass()
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        cls.browser = webdriver.Chrome(chrome_options=options)
    @classmethod
    def tearDownClass(cls):
        super(NewUserTests, cls).tearDownClass()
        cls.browser.quit()
    def testNewUser(self):
        # John is a new user. He decides to visit WordWrench and see what all
        # the hype is about.
        self.browser.get(self.live_server_url)
        self.assertIn('WordWrench', self.browser.title)
