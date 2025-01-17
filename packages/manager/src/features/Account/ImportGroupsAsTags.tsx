import * as React from 'react';
import Button from 'src/components/Button';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import Typography from 'src/components/core/Typography';
import Accordion from 'src/components/Accordion';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {},
  helperText: {
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  openDrawer: () => void;
}

const ImportGroupsAsTags = (props: Props) => {
  const { classes } = useStyles();
  const { openDrawer } = props;

  return (
    <Accordion
      className={classes.root}
      defaultExpanded={true}
      heading={'Import Display Groups as Tags'}
    >
      <Typography variant="body1" className={classes.helperText}>
        You now have the ability to import your Display Groups from Classic
        Manager as tags and they will be associated with your Linodes and
        Domains. This will give you the ability to organize and view your
        Linodes and Domains by tags.{' '}
        <strong>Your existing tags will not be affected.</strong>
      </Typography>
      <Button
        buttonType="primary"
        onClick={openDrawer}
        data-qa-open-import-drawer-button
      >
        Import Display Groups
      </Button>
    </Accordion>
  );
};

export default ImportGroupsAsTags;
