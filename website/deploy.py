import subprocess

commitMessage = input("Please enter a commit message with the " "")

subprocess.check_call("git add .", shell=True)
subprocess.check_call("git commit -m ${commitMessage}", shell=True)
subprocess.check_call("git push")
subprocess.check_call("npm run build")
subprocess.check_call("firebase deploy")