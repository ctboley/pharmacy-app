import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const propTypes = {
  // The content held inside of the card that will be rendered
  cardContent: PropTypes.node.isRequired,
  // the header inside of the card to be rendered
  cardHeaderAvatar: PropTypes.node,
  // The card headers title
  cardHeaderTitle: PropTypes.string,
  // The action items for the cards that will be rendered
  cardActions: PropTypes.node,
};

const CardLayout = (props) => {
  const { cardHeaderAvatar, cardHeaderTitle, cardActions, cardContent } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Card>
        <CardHeader
          title={cardHeaderTitle}
          avatar={cardHeaderAvatar}
        ></CardHeader>
        <CardContent>{cardContent}</CardContent>
        <CardActions>{cardActions}</CardActions>
      </Card>
    </Grid>
  );
};

CardLayout.propTypes = propTypes;

export default CardLayout;
