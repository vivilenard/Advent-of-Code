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
    print(section)
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

def parseNumbers(filePath):
    with open(filePath, "r") as f:
        content = f.read()
    
    sum = 0
    muls = content.split('mul')
    print(muls)
    for section in muls:
        numbers = extractNumbers(section)
        print(numbers)
        if not numbers:
            continue
        sum += multiply(numbers)
    return sum
    
print(parseNumbers("input.txt"))

