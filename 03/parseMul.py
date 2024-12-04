import copy


def numberLength(section):
    j = 0
    for char in section:
        if not char.isdigit():
            return j
        j += 1
    return j

def isValidNumber(section, numbers):
    n = numberLength(section)
    if n > 0 and n <= 3:
        numbers.append(int(section[:n]))
        return n
    return 0


def extractNumbers(section):
    numbers = []
    print('mul', section)
    i = 0
    if (section[i] == '('):
        i += 1
    numLength = isValidNumber(section[1:], numbers)
    if numLength : i += numLength
    else: return
    if (section[i] == ','):
        # print(section[i])
        i += 1
    else : return
    numLength = isValidNumber(section[i:], numbers)
    if numLength : i += numLength
    else: return
    if (section[i] == ')'):
        print('found valid: ', end='')
        return numbers
    return

def multiply(numbers):
    return numbers[0] * numbers[1]

def checkDo(section):
    global do
    lastIndexDo = section.rfind("do()")
    lastIndexDont = section.rfind("don't()")
    if lastIndexDo > lastIndexDont:
        do = True
        print('DO:', do)
    elif lastIndexDo < lastIndexDont:
        do = False
        print('DO:', do)
    return

do = True
Task = 1 #for second task set to 2


def parseNumbers(filePath):
    global do
    with open(filePath, "r") as f:
        content = f.read()
    
    sum = 0
    muls = content.split('mul')
    # print(muls)
    for section in muls:
        if do:
            numbers = extractNumbers(section)
            if numbers: print(numbers)
        if do and numbers:
            sum += multiply(numbers)
        if Task == 2:     # only check for dos in second task
            checkDo(section)
    return sum
    
print('\033[33m', parseNumbers("input.txt"), '\033[0m')

