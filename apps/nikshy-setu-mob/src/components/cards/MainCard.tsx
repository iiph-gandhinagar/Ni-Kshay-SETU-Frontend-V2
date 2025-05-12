import {
  AnimatedGradientCardProps,
  BmiResultProps,
  ChatBoatChatCardProps,
  ChatTextCardProps,
  QueryItemProps,
  ToolsCardProps,
  UniversalCardProps,
} from '@nikshay-setu-v3-monorepo/types';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { cardStyles } from '@nikshay-setu-v3-monorepo/constants';
import { BmiResult } from './ BmiResultCard';
import AnimatedGradientCard from './animatedCard';
import { ChatBoatChatCard } from './chatBoatChatCard';
import { ChatTextCard } from './chatTextCard';
import NewsCard from './newsFeedCard';
import { QueryItem } from './queryCard';
import RelatedAppsCard from './relatedAppCard';
import ToolsCard from './toolsCards';
import { UniversalCard } from './universalCard';

interface UniversalCardProp extends UniversalCardProps {
  styleName?: keyof typeof cardStyles;
}
interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
interface CardComponent extends FC<CardProps> {
  BmiResult: FC<BmiResultProps>;
  ToolsCard: FC<ToolsCardProps>;
  AnimatedGradientCard: FC<PropsWithChildren<AnimatedGradientCardProps>>;
  ChatTextCard: FC<ChatTextCardProps>;
  ChatBoatChatCard: FC<ChatBoatChatCardProps>;
  NewsCard: FC<unknown>;
  RelatedAppsCard: FC<unknown>;
  QueryItem: FC<QueryItemProps>;
  UniversalCard: FC<UniversalCardProp>;
}

const Card: CardComponent = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};
Card.BmiResult = BmiResult;
Card.ToolsCard = ToolsCard;
Card.AnimatedGradientCard = AnimatedGradientCard;
Card.ChatTextCard = ChatTextCard;
Card.ChatBoatChatCard = ChatBoatChatCard;
Card.NewsCard = NewsCard;
Card.RelatedAppsCard = RelatedAppsCard;
Card.QueryItem = QueryItem;
Card.UniversalCard = UniversalCard;

export { Card };
