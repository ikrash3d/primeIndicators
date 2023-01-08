import subprocess

commitMessage = input("Please enter a commit message with the double quotation mark: ")

print("This is the commit message {commitMessage}")

subprocess.run("git add .", shell=True)

subprocess.run("git commit -m {commitMessage}", shell=True)

subprocess.run("git push", shell=True)

subprocess.run("npm run build", shell=True)

subprocess.run("firebase deploy", shell=True)
