#! /usr/bin/python3
import os
import sys
from time import sleep

if(sys.platform.startswith('linux')):
	BLUE, RED, WHITE, YELLOW, PARPADEANTE, GREEN, END = '\33[94m', '\033[91m', '\33[97m', '\33[93m', '\033[5m', '\033[92m', '\033[0m'
else:
	BLUE, RED, WHITE, YELLOW, PARPADEANTE, GREEN, END ="","","","","","",""

def limpiar():
	if(sys.platform.startswith('linux')):
		os.system("clear")
	else:
		os.system("cls")

def menu():
	sleep(0.2)
	print("{}[0]{} Establecer usuario".format(YELLOW,END))
	sleep(0.2)
	print("{}[1]{} Clonar proyecto".format(YELLOW,END))
	sleep(0.2)
	print("{}[2]{} Reportar cambio".format(YELLOW,END))
	sleep(0.2)
	print("{}[3]{} Comparar Local vs Remoto".format(YELLOW,END))
	sleep(0.2)
	print("{}[4]{} Adquirir cambios remotos".format(YELLOW,END))
	sleep(0.2)
	print("{}[5]{} Ver estado e historial".format(YELLOW,END))
	sleep(0.2)
	print("{}[6]{} Subir cambios locales".format(YELLOW,END))
	sleep(0.2)
	acciones(input("{}{}\nOpción:{} ".format(GREEN,PARPADEANTE,END)))

def acciones(opt):
	limpiar()
	if(opt is "0"):
		nombre=input("Usuario:")
		os.system("git config --global user.name '"+str(nombre)+"'")
		correo=input("Correo:")
		os.system("git config --global user.email '"+str(correo)+"'")
		os.system("git config --global -l")

	if(opt is "1"):
		repo=input("Link Repositorio:")
		os.system("git clone "+str(repo))
		if(sys.platform.startswith('linux')):
			os.system("mv scriptGit ./"+str(repo.split("/")[4].split(".")[0]))
		else:
			os.system("move scriptGit "+str(repo.split("/")[4].split(".")[0]))
		print("Script Movido!!!")
		sleep(5)
		os.system("ls")
		exit()
		
	if(opt is "2"):
		message=input("Descripción de cambio:")
		os.system("git status -sb")
		os.system("git add .")
		os.system("git commit -m '"+str(message)+"'")
		os.system("git log --graph --oneline")
		
	if(opt is "3"):
		limpiar()
		os.system("git fetch")
		if(sys.platform.startswith('linux')):
			os.system("git difftool -y --tool=meld master origin/master")
		else:
			print("INGRESAR ':q' PARA SALIR DEL COMPARADOR")
			input()
			os.system("git difftool -y master origin/master")
		
	if(opt is "4"):
		os.system("git merge")
		input()
		
	if(opt is "5"):
		os.system("git status")
		if(sys.platform.startswith('linux')):
			os.system("git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)%Creset' --abbrev-commit")
		else:
			os.system("git log --graph --oneline --decorate --all")
		
	if(opt is "6"):
		os.system("git push origin --all")

limpiar()

#for i in range(200):
#	print(str(i)+"--"+'\033['+str(i)+"mCOLOR"+'\033[0m')


while(True):
	print("\n")
	print("\033[33m __           _       _       ___ _ _  \033[0m") 
	print("\033[33m/ _\ ___ _ __(_)_ __ | |_    / _ (_) |_ \033[0m")
	print("\033[33m\ \ / __| '__| | '_ \| __|  / /_\/ | __|\033[0m")
	print("\033[33m_\ \ (__| |  | | |_) | |_  / /_)\| | |_  \033[0m")
	print("\033[33m\__/\___|_|  |_| .__/ \__| \____/|_|\__|\033[0m")
	print("\033[33m               |_|              ")
	print("\n")
	menu()
