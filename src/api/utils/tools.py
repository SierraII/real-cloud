import os

def get_directory_files(directories):

    files = directories[:]

    for directory in directories:
        for dirname, dirs, files in os.walk(directory):
            for filename in files:
                filename = os.path.join(dirname, filename)
                if os.path.isfile(filename):
                    files.append(filename)

    return files
