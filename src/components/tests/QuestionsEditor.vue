<template>
  <div class="test__questions">
    <div v-for="question, index in questions" :key="question.id" class="test__question card">
      <icon @click="removeQuestion(index)" class="test__question-remove" icon="times" />
      
      <div class="test__question-condition">
        <span>{{ index + 1 }}.</span>
        <UiEditor
          v-model="question.condition"
          class="test__question-condition-editor"
          placeholder="Вопрос"
          :lineWrap="false"
        />
      </div>

      <div class="test__question-answer">
        <div v-if="question.kind == 'RADIO'" class="test__question-radios">
          <label v-for="option, optionIndex in question.options" class="test__question-radio">
            <input :value="option" :name="index" type="radio">
            <span class="radio"></span>
            <input v-model="question.options[optionIndex]" class="test__question-input" type="text" placeholder="Вариант ответа">
            <icon @click.prevent="removeOption(question, optionIndex)" icon="times" />
          </label>
          <icon @click="addOption(question)" icon="plus" />
        </div>
        <input v-else v-model="questions[index].answer" class="test__question-input" :type="question.kind" placeholder="Ответ">
        <UiSelect
          v-model="question.kind"
          :items="{TEXT: 'Текст', NUMBER: 'Число', RADIO: 'Один из списка'}"
          class="test__question-kind"
        />
      </div>
    </div>

    <button @click="addQuestion" class="test__add-question-btn">
      <icon icon="plus" />
    </button>
  </div>
</template>

<script setup>
  let lastId = 1
  const questions = ref([])

  const addQuestion = () => {
    questions.value.push({
      id: lastId,
      condition: '',
      kind: 'TEXT',
      image: '',
      answer: null,
      options: [''],
    })
    lastId += 1
  }

  const removeQuestion = index => {
    questions.value.splice(index, 1)
  }

  const getQuestions = () => {
    if (!questions.value.length) {
      return useErrorMsg('Сначала добавь вопросы')
    }

    let check = questions.value.every((item, index) => {
      if (!item.condition) {
        return useErrorMsg('Сначала заполни все вопросы')
      }

      if (item.kind == 'RADIO') {
        let radios = document.querySelectorAll(`.test__question-radio > input[type="radio"][name="${index}"]`)
      
        if (radios.length == 0) return useErrorMsg('Сначала заполни все вопросы')

        let radiosCheck = true
        radios.forEach(i => {
          if (!i.value) {
            radiosCheck = false
            return useErrorMsg('Сначала заполни все вопросы')
          }
        })
        if(!radiosCheck) return false

        item.answer = document.querySelector(`.test__question-radio > input[type="radio"][name="${index}"]:checked`)?.value
      } else {
        item.options = []
      }

      if (!item.image) delete item.image

      if (!item.answer) {
        return useErrorMsg('Сначала заполни все вопросы')
      }

      return true
    })

    return check ? questions.value : false
  }

  const addOption = question => question.options.push('')

  const removeOption = (question, optionIndex) => {
    question.options.splice(optionIndex, 1)
  }

  defineExpose({getQuestions})
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';


  input[type="radio"], input[type="checkbox"] {
    display: none;
  }

  .radio, .checkbox {
    display: inline-block;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    border: 1px solid @secondary;
    box-sizing: border-box;
    font-size: 1.1rem;
    transition: .3s;
  }

  .radio {
    border-radius: 50%;
  }

  .checkbox {
    border-radius: 20%;
  }

  .radio:hover,
  input[type="radio"]:checked + .radio {
    border-width: .3em;
    cursor: pointer;
  }

  .checkbox:hover,
  input[type="checkbox"]:checked + .checkbox {
    border-width: .5em;
    cursor: pointer;
  }


  .test__questions {
    display: flex;
    flex-direction: column;
    gap: inherit;
  }

  .test__question {
    position: relative;
  }

  .test__question-remove {
    position: absolute;
    top: .6em;
    right: .6em;
    font-size: 1.3em;
    transition: @transition;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  .test__question-condition {
    display: flex;
    gap: .3em;
  }

  .test__question-condition-editor {
    flex-grow: 1;
  }

  .test__question-answer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5em;
  }

  .test__question-radios {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1em;
  }

  .test__question-radio {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .test__question-kind {
    width: 12em;
    flex-shrink: 0;
  }

  .test__add-question-btn {
    .button.secondary();

    align-self: center;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    font-size: 1.8em;
    transition: @transition;
  }
</style>