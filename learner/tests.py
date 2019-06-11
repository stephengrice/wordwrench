from django.test import TestCase

class LearnerTests(TestCase):
    def test_index_template_used(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'index.html')
    def test_languages_page_shows(self):
        response = self.client.get('/language/select')
        self.assertTemplateUsed(response, 'select.html')
    def test_languages_post_redirects_spanish(self):
        response = self.client.post('/language/select', {'language': 'spanish'})
        self.assertRedirects(response, '/language/spanish')
    def test_languages_post_redirects_russian(self):
        response = self.client.post('/language/select', {'language': 'russian'})
        self.assertRedirects(response, '/language/russian')
    def test_languages_topic_shows(self):
        response = self.client.get('/language/spanish/greetings')
        self.assertTemplateUsed(response, 'topic.html')
        self.assertIn('spanish', response.content.decode(response.charset).lower())
        self.assertIn('greetings', response.content.decode(response.charset).lower())
