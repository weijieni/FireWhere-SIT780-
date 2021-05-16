

###################################################
#preperation 

library(tree)
library(e1071)
library(ROCR)
library(rpart)
library(adabag)
library(arulesViz)
library(randomForest)
library(neuralnet)
library(car)
options(digits = 4)


rm(list = ls())
getwd()
setwd("/Users/guixiaoran/Desktop/FIT3152/a2")
WAUS = read.csv("WAUS2020.csv")

L = as.data.frame(c(1:49))
set.seed(27178234)
L = L[sample(nrow(L),10,replace = F),]
WAUS = WAUS[(WAUS$Location %in% L),]
WAUS = na.omit(WAUS) #### important 
WAUS = WAUS[sample(nrow(WAUS), 2000,replace = F),]

###################################################

# proportion of rainy days to fine days
a = WAUS[WAUS$RainToday == "Yes",]
b = a[a$RainTomorrow == "No",]
nrow(a) #420
nrow(b) #222
222 / 2000 # 0.111
# mean and standard divation
summary(WAUS$MinTemp)
sd(WAUS$MinTemp)
summary(WAUS$MaxTemp)
sd(WAUS$MaxTemp)

# sunny days are much more than rainy days 
# omit day

##############################################
# question 2 
# na.omit

#############################################
# question 3 

set.seed(27178234)
train.row = sample(1:nrow(WAUS),0.7*nrow(WAUS))
WAUS.train = WAUS[train.row,]
WAUS.test = WAUS[-train.row,]


##############################################


#decision tree 
WAUStree.fit = tree(RainTomorrow~., data = WAUS.train)
summary(WAUStree.fit)
#naive bayes 
WAUSnaive.fit = naiveBayes(RainTomorrow~.,data = WAUS.train)
summary(WAUSnaive.fit)

#bagging 

ibag = bagging(RainTomorrow~., data = WAUS.train, mfinal = 10)
summary(ibag)

#boosting
iboost = boosting(RainTomorrow~., data = WAUS.train, mfinal = 10)
summary(iboost)

#random forest 
irf = randomForest(RainTomorrow~., data = WAUS.train)
summary(irf)




###############################################


# test decision tree 
WAUStree.pred = predict(WAUStree.fit,WAUS.test, type = "class")
t1 = table(predicted = WAUStree.pred, actual = WAUS.test$RainTomorrow )
t1
# accuracy of decision tree  0.8133
(421+67)/(421+67+66+46)

# test naive bayes
WAUSnaive.pred = predict(WAUSnaive.fit,WAUS.test, type = "class")
t2 = table(predicted = WAUSnaive.pred, actual = WAUS.test$RainTomorrow )
t2
# accuracy of decision tree  0.8217
(401+92)/600

# test bagging 
ibapred = predict.bagging(ibag,newdata = WAUS.test)
print(ibapred$confusion)
# accuracy 
(446+57)/(446+57+21+76) # 0.8383

# test boosting 
ibopred = predict.boosting(iboost,newdata = WAUS.test)
print(ibopred$confusion)
#accuracy: 0.8333
(431+69)/(431+69+64+36)

# test randomforest 
irfpred = predict(irf,WAUS.test)
table(observed = WAUS.test$RainTomorrow,predicted = irfpred)

# accuracy : 0.845
(433+74)/(433+74+34+59)

###################################################


# calculate confidence for each case and roc curve
# decision tree
WAUStree.pred2 = predict(WAUStree.fit, WAUS.test,type = "vector")
WAUStree.pred2
WAUStree.pred2.p = prediction(WAUStree.pred2[,2] , WAUS.test$RainTomorrow )
WAUStree.pred2.p.perf = performance(WAUStree.pred2.p, "tpr","fpr")
plot(WAUStree.pred2.p.perf, col ="red" )
abline(0,1)
treeauc = performance(WAUStree.pred2.p,"auc")
print(as.numeric(treeauc@y.values)) # 0.8312


# naive bayes 
WAUSnaive.pred2 = predict(WAUSnaive.fit, WAUS.test,type = "raw")
WAUSnaive.pred2
WAUSnaive.pred2.p = prediction(WAUSnaive.pred2[,2] , WAUS.test$RainTomorrow )
WAUSnaive.pred2.p.perf = performance(WAUSnaive.pred2.p, "tpr","fpr")
WAUSnaive.pred2.p.perf
plot(WAUSnaive.pred2.p.perf,add = T,col="green")

naiveauc = performance(WAUSnaive.pred2.p,"auc")
print(as.numeric(naiveauc@y.values)) # 0.8707
# bagging

WAUSbag.pred2.p = prediction(ibapred$prob[,2] , WAUS.test$RainTomorrow )
WAUSbag.pred2.p.perf = performance(WAUSbag.pred2.p, "tpr","fpr")
plot(WAUSbag.pred2.p.perf,add=T,col="blue")

baggingauc = performance(WAUSbag.pred2.p,"auc")
print(as.numeric(baggingauc@y.values)) # 0.8528
# boosting
WAUSboost.pred2.p = prediction(ibopred$prob[,2] , WAUS.test$RainTomorrow )
WAUSboost.pred2.p.perf = performance(WAUSboost.pred2.p, "tpr","fpr")

plot(WAUSboost.pred2.p.perf,add=T,col="yellow")

boostingauc = performance(WAUSboost.pred2.p,"auc")
print(as.numeric(boostingauc@y.values)) # 0.8555

# randomforest
irfpred.rf = predict(irf,WAUS.test,type = "prob")
WAUSirf.pred2.p = prediction(irfpred.rf[,2] , WAUS.test$RainTomorrow )
WAUSirf.pred2.p.perf = performance(WAUSirf.pred2.p, "tpr","fpr")

plot(WAUSirf.pred2.p.perf,add=T,col="purple")

rfauc = performance(WAUSirf.pred2.p,"auc")
print(as.numeric(rfauc@y.values)) # 0.8555

###################################################

# determine the most important variable 

print(summary(WAUStree.fit))
print(ibag$importance)
print(iboost$importance)
print(irf$importance)


# decision tree method 

test.fit = cv.tree(WAUStree.fit,FUN = prune.misclass)
plot(test.fit)
print(WAUStree.fit)

prune.treefit=prune.misclass(WAUStree.fit,best = 9) # check mis correspond to size 
summary(prune.treefit)

# test accuracy again 
zp.pred = predict(prune.treefit,WAUS.test, type = "class")
table(predicted = zp.pred, actual = WAUS.test$RainTomorrow)
(421+67)/(421+66+46+67)

# random forest
irf = randomForest(RainTomorrow~., data = WAUS.train,
                   ntree = 300,
                   mtry = 2,
                   importance=T)
irf

irfpred = predict(irf,WAUS.test)
confusionMatrix(irfpred,WAUS.test$RainTomorrow)

plot(irf)

t = tuneRF(WAUS.train[,-25],WAUS.train[,25],
           stepFactor = 0.5,
           plot = T,
           ntreeTry = 350,
           trace = T,
           improve = 0.05)



require(dplyr)
WAUS= WAUS %>% mutate(RainTomorrow = ifelse(RainTomorrow == "No",0,1))

WAUS$RainTomorrow = as.numeric(WAUS$RainTomorrow)
head(WAUS)
w.nn = neuralnet(RainTomorrow ~ 
                   MinTemp + MaxTemp+Rainfall+Sunshine,
                 WAUS.train, hidden = 3)
WAUS.pred = compute(w.nn, WAUS.test[c(5,6,7,9,17,18)])

plot(w.nn,rep ="best")


























