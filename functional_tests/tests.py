from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

class FunctionalTests(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super(FunctionalTests, cls).setUpClass()
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        cls.browser = webdriver.Chrome(chrome_options=options)
        cls.browser.implicitly_wait(10) # seconds
    @classmethod
    def tearDownClass(cls):
        super(FunctionalTests, cls).tearDownClass()
        cls.browser.quit()
    def test_new_user(self):
        # John is a new user. He decides to visit WordWrench and see what all
        # the hype is about.
        self.browser.get(self.live_server_url)
        self.assertIn('WordWrench', self.browser.title)
        # TODO finish this to include sign-up flow
    def test_mvp(self):
        # Minimum viable product for this app:
        # A user logs onto the website
        self.browser.get(self.live_server_url)
        # He/she is presented with a call to action - start learning!
        btn_start_learning = self.browser.find_element_by_id('btn_start_learning')
        self.assertIn('start learning', btn_start_learning.text.lower())
        btn_start_learning.click()
        # The languages page should now load
        self.assertEquals(self.live_server_url + '/language/select', self.browser.current_url)
        # After clicking through, user can select a language
        # A list of languages is presented - Spanish, Russian, Japanese
        lst_languages = self.browser.find_element_by_id('lst_languages')
        self.assertIn('Spanish', lst_languages.text)
        self.assertIn('Russian', lst_languages.text)
        self.assertIn('Japanese', lst_languages.text)
        # User must select one before continuing.
        btn_next = self.browser.find_element_by_id('btn_next')
        # User chooses Spanish
        btn_spanish = self.browser.find_element_by_css_selector('#lst_languages label[for="spanish"]')
        btn_spanish.click()
        radio_spanish = self.browser.find_element_by_css_selector('#lst_languages input[type=radio][id="spanish"]')
        self.assertTrue(radio_spanish.is_selected())
        # User clicks next
        btn_next.click()
        # User is directed to Spanish lessons home page.
        lbl_language = self.browser.find_element_by_id('lbl_language')
        self.assertEquals('Spanish', lbl_language.text)
        # A short list of topics are available (at least 3)
        lst_topics = self.browser.find_element_by_id('lst_topics')
        topics = lst_topics.find_elements_by_css_selector('.topic')
        self.assertGreaterEqual(len(topics), 3)
        # User selects a topic
        btn_topic = lst_topics.find_element_by_css_selector('.topic #btn_start')
        btn_topic.click()
        # User is sent to dynamic learning page for that topic
        # A progress bar is shown at the top
        progress_bar = self.browser.find_element_by_id('progress-bar')
        # A short sentence is presented in the target language (Spanish) - "Hola"
        lbl_prompt = self.browser.find_element_by_id('lbl_prompt')
        self.assertEquals('Hola', lbl_prompt.text)
        # The user hover over the new word to see what it means
        actions = ActionChains(self.browser)
        actions.move_to_element(lbl_prompt).perform()
        # The translation is displayed when hovered
        lbl_translation = self.browser.find_element_by_id('lbl_translation')
        self.assertTrue(lbl_translation.is_displayed())
        # A text box is shown where the user can type in an answer
        txt_answer = self.browser.find_element_by_id('txt_answer')
        # The user types - "Hello" and presses enter
        txt_answer.send_keys('Hello')
        txt_answer.send_keys(Keys.ENTER)
        # The screen indicates with that the user was correct, and provides
        # next button.
        lbl_grade = self.browser.find_element_by_id('lbl_grade')
        self.assertTrue(lbl_grade.is_displayed())
        self.assertIn('correct', lbl_grade.text.lower())

        # Progress bar indicates 50%
        progress_bar = self.browser.find_element_by_id('progress-bar')
        self.assertEquals("50%", progress_bar.get_attribute('data-progress'))
        # User presses enter to advance.
        btn_next = self.browser.find_element_by_id('btn_next')
        btn_next.click()
        # The screen shows another sentence, this time in English - "Hello"
        lbl_prompt = find_element_by_id('lbl_prompt')
        self.assertEquals('Hello', lbl_prompt.text)
        # The user types the wrong thing - "Adios" - and hits enter
        txt_answer = self.browser.find_element_by_id('txt_answer')
        txt_answer.send_keys('Adios')
        txt_answer.send_keys(Keys.ENTER)
        # The screen indicates that the user was wrong.
        lbl_grade = self.browser.find_element_by_id('lbl_grade')
        self.assertTrue(lbl_grade.is_displayed())
        self.assertIn('incorrect', lbl_grade.text.lower())

        # The wrong answer is presented again at some point
        # TODO -------------------------------------- DRY this section up
        # Progress bar indicates 50%
        progress_bar = self.browser.find_element_by_id('progress-bar')
        self.assertEquals("50%", progress_bar.get_attribute('data-progress'))
        # User presses enter to advance.
        btn_next = self.browser.find_element_by_id('btn_next')
        btn_next.click()
        # The screen shows another sentence, this time in English - "Hello"
        lbl_prompt = find_element_by_id('lbl_prompt')
        self.assertEquals('Hello', lbl_prompt.text)
        # The user types the wrong thing - "Adios" - and hits enter
        txt_answer = self.browser.find_element_by_id('txt_answer')
        txt_answer.send_keys('Hola')
        txt_answer.send_keys(Keys.ENTER)
        # The screen indicates with that the user was correct, and provides
        # next button.
        lbl_grade = self.browser.find_element_by_id('lbl_grade')
        self.assertTrue(lbl_grade.is_displayed())
        self.assertIn('correct', lbl_grade.text.lower())
        # ---------------------------------------------- end copy pasta
        # When all questions have been answered correctly, a summary screen
        # is shown.
        lbl_summary = self.browser.find_element_by_id('lbl_summary')
        self.assertEquals('Summary', lbl_summary.text)
        # Number correct and incorrect is shown
        lbl_correct = self.browser.find_element_by_id('lbl_correct')
        self.assertEquals('Correct: 2', lbl_correct.text)
        lbl_incorrect = self.browser.find_element_by_id('lbl_incorrect')
        self.assertEquals('Incorrect: 1', lbl_incorrect.text)
        # Missed answers are shown
        lst_missed_answers = self.browser.find_element_by_id('lst_missed_answers')
        self.assertIn('Hola (Hello)', lst_missed_answers.text)
        # The user clicks Next on the summary screen
        btn_next = self.browser.find_element_by_id('btn_next')
        btn_next.click()
        # He/she is redirected to the home page for their language (Spanish)
        lbl_language = self.browser.find_element_by_id('lbl_language')
        self.assertEquals('Spanish', lbl_language.text)
