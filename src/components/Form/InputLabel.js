import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { HelpLink, Label, LabelContent, Span } from './Form.styles';

const InputLabel = ({ helpLinkPath, helpMessage, htmlFor, name, label }) => (
  <Label htmlFor={htmlFor}>
    <LabelContent>
      <Span>{label ?? <FormattedMessage id={`common.${name}`} />}</Span>
      {helpLinkPath && <HelpLink to={helpLinkPath}>{helpMessage}</HelpLink>}
    </LabelContent>
  </Label>
);

InputLabel.defaultProps = {
  helpLinkPath: '',
  helpMessage: '',
  label: null,
};

InputLabel.propTypes = {
  name: PropTypes.string.isRequired,
  helpLinkPath: PropTypes.string,
  helpMessage: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InputLabel;
