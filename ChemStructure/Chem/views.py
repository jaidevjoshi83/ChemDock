from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import signal

def ints(request):
    return render(request, 'Chem/ints.html', {'host':request.get_host()})

@csrf_exempt
def post_form_api(request):
    print("OKKK")
    if request.method == "POST":
        form = request.POST
        if form:
            f =  open(  'chem.mol', 'w')
            f.write(form.dict()['file'])
            f.close()
            return JsonResponse(form.dict(), status=201)
        return JsonResponse('error', status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def close_server(request):
    if request.method == "POST":
        form = request.POST
        if form:
            os.kill(os.getpid(), signal.SIGINT)
            return JsonResponse(form.dict(), status=201)
        return JsonResponse('error', status=400)
    else:
        return HttpResponseBadRequest()

