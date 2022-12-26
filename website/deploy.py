import subprocess

commitMessage = input("Please enter a commit message with the double quotation mark: ")

p1 = subprocess.run("git add .", shell=True)

p2 = subprocess.run("git commit -m ${commitMessage}", shell=True)

p3 = subprocess.run("git push")

p4 = subprocess.run("npm run build")

p5 = subprocess.run("firebase deploy")
