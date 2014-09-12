module.exports = {
  author: 'tim',
  title: 'Episode 1',
  groups: [
    {
      type: 'info',
      slides: [         
        {
          type: 'title',
          title: 'Episode 1',
          subtitle: 'bible soap opera demo'
        },        
        {
          type: 'info',
          content: '<p>This is an experimental demo.</p><p>It has been developed with firefox, and is not tested on other browsers.</p><p>The UI is designed for a small screen (320x480) landscape. Press <code>ctrl-shift-m</code> in firefox to change your screen size.</p><p>Enjoy!</p>'
        }        
      ]
    },
    {
      type: 'quiz',
      slides: [
        {
          type: 'pick',
          question: 'What is the answer?',
          answers: [
            'answer 1',
            'answer 2',
            'answer 3'
          ]
        },
        {
          type: 'slider',
          question: 'How big is an apple?',
          left: 'small',
          right: 'large'
        },
        {
          type: 'sort',
          question: 'Put these in order from smallest to largest:',
          answers: [
            'mouse',
            'elephant',
            'grape',
            'pig'
          ]
        },
        {
          type: 'discuss',
          question: 'Discuss: how big is the sky?'
        }
      ]
    },
    {
      type: 'audio',
      slides: [
        {
          type: 'audio',
          start: 0,
          end: 60
        }
      ]
    },
    {
      type: 'info',
      slides: [
        {
          type: 'info',
          text: 'Thanks for trying out the demo'
        }
      ]
    },
  ]
}
