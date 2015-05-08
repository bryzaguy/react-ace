/** @jsx React.DOM */

var ace = require('brace');
var React = require('react');

module.exports = React.createClass({
  propTypes: {
    mode  : React.PropTypes.string,
    className : React.PropTypes.string,
    wordWrap : React.PropTypes.bool,
    theme : React.PropTypes.string,
    name : React.PropTypes.string,
    fontSize : React.PropTypes.number,
    showGutter : React.PropTypes.bool,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    maxLines : React.PropTypes.number,
    readOnly : React.PropTypes.bool,
    highlightActiveLine : React.PropTypes.bool,
    showPrintMargin : React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      name   : 'brace-editor',
      mode   : '',
      theme  : '',
      value  : '',
      className  : '',
      fontSize   : 12,
      showGutter : true,
      onChange   : null,
      onLoad     : null,
      maxLines   : null,
      readOnly   : false,
      highlightActiveLine : true,
      showPrintMargin     : true
    };
  },
  onChange: function() {
    var value = this.editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },
  init: function (props) {
    editor = ace.edit(props.name);
    editor.getSession().setMode('ace/mode/'+props.mode);
    editor.setTheme('ace/theme/'+props.theme);
    editor.setFontSize(props.fontSize);
    editor.setOption('maxLines', props.maxLines);
    editor.setOption('readOnly', props.readOnly);
    editor.setOption('highlightActiveLine', props.highlightActiveLine);
    editor.setShowPrintMargin(props.setShowPrintMargin);
    editor.getSession().setUseWrapMode(props.wordWrap);
    if (editor.getValue() !== props.value) {
      editor.setValue(props.value);
      editor.clearSelection();
    }
    editor.renderer.setShowGutter(props.showGutter);
    if (props.onLoad) {
      props.onLoad(editor);
    }
    editor.resize();
  },
  componentDidMount: function() {
    this.init(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    this.init(nextProps);
  },
  render: function() {
    return (<div id={this.props.name} 
      onChange={this.onChange} 
      className={this.props.className}>
      </div>);
  }
});
