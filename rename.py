import os
import shutil
mainPath = '/home/deepak/Exams/Gate/TurboMachinery/1 Hydraulic Turbines'
for dir in os.listdir(mainPath):
    for root, directory, fileName in os.walk(f'{mainPath}/{dir}'):
        date = root.split('/')[-1]
        fileName = fileName[0]
        newFileName = root+'/'+fileName.replace('.mp4', f'.{date}.mp4')
        os.rename(root+'/'+fileName, newFileName)
        shutil.move(newFileName, newFileName.replace(date + '/', ''))
        os.rmdir(root)