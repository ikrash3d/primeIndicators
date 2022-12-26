import subprocess

commitMessage = input("Please enter a commit message with the double quotation mark: ")

p1 = subprocess.run("git add .", shell=True)

p2 = subprocess.run("git commit -m ${commitMessage}", shell=True)

p3 = subprocess.run("git push", shell=True)

p4 = subprocess.run("npm run build", shell=True)

p5 = subprocess.run("firebase deploy", shell=True)
