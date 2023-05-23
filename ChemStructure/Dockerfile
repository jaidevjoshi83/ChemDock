# base image  
FROM continuumio/miniconda3

# setup environment variable  
ENV DockerHOME=/home/app/webapp  


# set work directory  
RUN mkdir -p $DockerHOME  


#RUN conda create -n RDKIT -c conda-forge rdkit -y 
#RUN /bin/bash -c "source activate RDKIT"


RUN conda install  -c conda-forge rdkit django django-import-export

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
#RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 

RUN echo "work directory"
COPY . $DockerHOME  


# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py runserver 0.0.0.0:8000  
