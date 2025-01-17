import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import InsertPhoto from '@mui/icons-material/InsertPhoto';
import { isEmpty, slice } from 'ramda';
import * as React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Typography from 'src/components/core/Typography';
import Grid from 'src/components/Grid';
import ShowMoreExpansion from 'src/components/ShowMoreExpansion';
import TicketAttachmentRow from './TicketAttachmentRow';

type ClassNames = 'root' | 'attachmentPaperWrapper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(7),
      maxWidth: 600,
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(5),
        width: 'calc(100% - 32px)',
      },
    },
    attachmentPaperWrapper: {
      overflowX: 'auto',
    },
  });

interface ToggleProps {
  showMoreAttachments: boolean;
  toggle: (e: React.MouseEvent<HTMLDivElement>) => (t: boolean) => boolean;
}

interface Props {
  attachments: string[];
}

type CombinedProps = Props & ToggleProps & WithStyles<ClassNames>;

export const addIconsToAttachments = (attachments: string[] = []) => {
  const extensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff'];
  return attachments.map((attachment, idx) => {
    // try to find a file extension
    const lastDotIndex = attachment.lastIndexOf('.');
    const ext = attachment.slice(lastDotIndex + 1);
    if (ext && extensions.includes(ext.toLowerCase())) {
      return <InsertPhoto key={idx} />;
    }
    return <InsertDriveFile key={idx} />;
  });
};

export const TicketAttachmentList: React.FC<CombinedProps> = (props) => {
  const { attachments, classes, showMoreAttachments, toggle } = props;

  if (isEmpty(attachments)) {
    return null;
  }
  // create an array of icons to use
  const icons = addIconsToAttachments(attachments);

  return (
    <Grid item container justifyContent="flex-start" className={classes.root}>
      <Grid item className={classes.attachmentPaperWrapper}>
        <Typography variant="h3">Attachments</Typography>
        <TicketAttachmentRow
          attachments={slice(0, 5, attachments)}
          icons={icons}
        />
        {attachments.length > 5 && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            onClick={toggle}
            style={{ display: 'inline-block' }}
            data-qa-attachment-toggle
            role="button"
            tabIndex={0}
          >
            <ShowMoreExpansion
              name={
                !showMoreAttachments ? 'Show More Files' : 'Show Less Files'
              }
              defaultExpanded={false}
            >
              <TicketAttachmentRow
                attachments={slice(5, Infinity, attachments)}
                icons={icons}
              />
            </ShowMoreExpansion>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

const styled = withStyles(styles);

const enhanced = compose<CombinedProps, Props>(
  withStateHandlers(
    { showMoreAttachments: false },
    {
      toggle: ({ showMoreAttachments }) => () => ({
        showMoreAttachments: !showMoreAttachments,
      }),
    }
  ),
  styled
)(TicketAttachmentList);

export default enhanced;
