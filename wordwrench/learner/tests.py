from django.test import TestCase

class LearnerTests(TestCase):
    def test_index_template_used(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'index.html')
    def test_languages_page_shows(self):
        response = self.client.get('/languages')
        self.assertTemplateUsed(response, 'languages.html')
