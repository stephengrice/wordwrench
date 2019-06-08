from django.test import TestCase

class LearnerTests(TestCase):
    def test_index_template_used(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, "index.html")
