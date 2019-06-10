from django.shortcuts import render, redirect

# Create your views here.

def index(request):
   return render(request, 'index.html')

def select(request):
    if request.method == 'POST':
        return redirect('language-home', language=request.POST.get('language'))
    return render(request, 'select.html')

def language(request, language):
    return render(request, 'language.html')
