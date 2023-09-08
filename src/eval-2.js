const EXP_STATES = {
  start: 'start',
  operand: 'operand',
  operator: 'operator',
}

function isDigit(char) {
  return /^\d$/.test(char)
}

function isOperator(operator) {
  return operator === '+' || operator === '-'
}

function isWhiteSpace(space) {
  return space === ' '
}

export function evalExpression(expression) {
  if (expression === '') {
    return ''
  }
  // We need to tokenize the expression and extract out the tokens
  // our tokens are operands - number, operators: + and -
  // We shall tokenize the given expression and collect all operands and operators
  const operandStack = []
  const operatorStack = []
  let state = EXP_STATES.start
  let operand = ''
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i]
    if (isDigit(char)) {
      if (
        state === EXP_STATES.start ||
        state === EXP_STATES.operand ||
        state === EXP_STATES.operator
      ) {
        operand += char
        state = EXP_STATES.operand
      }
    } else if (isOperator(char)) {
      // + -
      if (state === EXP_STATES.operand) {
        // we have come past a number and encountering this operator
        // so push the operand collected so far
        operandStack.push(operand)
        operand = ''
        state = EXP_STATES.operator
        operatorStack.push(char)
      } else {
        throw 'operator needs to follow an operand'
      }
    } else if (isWhiteSpace(char)) {
      continue
    } else {
      throw 'Unrecognized token found in the expression!'
    }
  }
  if (state === EXP_STATES.operand) {
    operandStack.push(operand)
  }

  // We need to evaluate the expression
  // we repeatedly pop an operator, and try to apply it by popping two operands needed.
  // if no enough operands, that is an error
  // at the end operand stack should have only one item in it and it is the answer.
  // and operator stack must be empty.
  while (operatorStack.length > 0) {
    const operarator = operatorStack.shift()
    const op1 = operandStack.shift()
    const op2 = operandStack.shift()
    if (op1 !== undefined && op2 !== undefined) {
      const op1Num = parseInt(op1)
      const op2Num = parseInt(op2)
      if (operarator === '+') {
        operandStack.unshift((op1Num + op2Num).toString())
      } else {
        operandStack.unshift((op1Num - op2Num).toString())
      }
    }
  }
  if (operandStack.length === 1) {
    // the only item in operand stack must be the result
    return operandStack.pop()
  } else {
    throw 'Invalid expression, more operands found!'
  }
}
