#############

#inprove basic decision tree 

install.packages("e1071")
library(e1071)
ptrain = read.csv("playtennistrain.csv")
ptest = read.csv("playtennistest.csv")

tmodel = naiveBayes(Play~. -Day, data = ptrain)
tpredict = predict(tmodel,ptest)
tpredict

table(actual = ptest$Play, predicted = tpredict)
tpredict.r = predict(tmodel,ptest,type = 'raw')
tpredict.r

################################################

setwd("/Users/guixiaoran/Desktop/FIT3152/week8")
rm(list=ls())
library(tree)
library(e1071)
library(ROCR)
library(rpart)


# compute a simple ROC curve
pconfidence = c(0.7,0.9,0.4,0.1,0.9,0.8,0.3,0.6,0.7,0.6)
plables = c(0,1,0,0,1,1,1,1,1,0)
cpred = prediction(pconfidence,plables)
cpred
# tpr, fpr
cperf = performance(cpred,"tpr","fpr")
plot(cperf)
abline(0,1)

# aus
cauc = performance(cpred,"auc")
print(as.numeric(cauc@y.values))

clift = performance(cpred,"lift")
plot(clift)
print(clift@y.values)



###############################

rm(list = ls())
zoo = read.csv("zoo.data.csv")
zoo$type = factor(zoo$type)

set.seed(9999)
train.row = sample(1:nrow(zoo),0.7*nrow(zoo))
zoo.train = zoo[train.row,]
zoo.test = zoo[-train.row,]

zoo.fit = tree(type~. -animal_name,  data = zoo.train)
plot(zoo.fit)
text(zoo.fit,pretty = 0)
# test accuracy 
zoo.pred = predict(zoo.fit, zoo.test,type = "class")
zoo.pred
table(predicted = zoo.pred, actual = zoo.test$type)

# use cross validation and pruning to betterfiy the tree
test.fit = cv.tree(zoo.fit,FUN = prune.misclass)
print(test.fit)

prune.zoofit=prune.misclass(zoo.fit,best = 5) # check mis correspond to size 
summary(prune.zoofit)
plot(prune.zoofit)
text(prune.zoofit,pretty = 0)

# test accuracy again 
zp.pred = predict(prune.zoofit,zoo.test, type = "class")
table(predicted = zp.pred, actual = zoo.test$type)


#####################################
# implement naive bayes classification in r 

rm(list = ls())
zoo = read.csv("zoo.data.csv")
zoo$type = factor(zoo$type)

set.seed(9999)
train.row = sample(1:nrow(zoo),0.7*nrow(zoo))
zoo.train = zoo[train.row,]
zoo.test = zoo[-train.row,]

# fit model 
zoo.model = naiveBayes(type~. -animal_name,data = zoo.train)

# test accuracy 
zn.pred = predict(zoo.model,zoo.test)
table(predicted = zn.pred, actual = zoo.test$type)

#############################################
# 

rm(list = ls())

ja = read.csv("JapaneseCredit.csv")
ja$class = factor(ja$Class)

set.seed(9999)
train.row = sample(1:nrow(ja),0.7*nrow(ja))
ja.train = ja[train.row,]
ja.test = ja[-train.row,]

jat.fit = tree(class~.-Class , data = ja.train)
jan.fit = naiveBayes(class~. - Class, data = ja.train)

plot(jat.fit)
text(jat.fit,pretty = 0)

# test both 
# decision tree 
jt.pred = predict(jat.fit,ja.test,type = "class")
t1 = table(predicted = jt.pred, actual = ja.test$class)
t1
(108+65)/208
# accuracy = 0.8317308

jn.pred = predict(jan.fit,ja.test ,type = "class")
t2 = table(predicted = jn.pred , actual = ja.test$class)
t2
(111+51)/208

# accuracy = 0.7788462


###### calculate the confidence of predicting a + for each of the test case
ja.predtree = predict(jat.fit, ja.test,type = "vector")
ja.predtree
japtree = prediction(ja.predtree[,2] , ja.test$class )
japperf = performance(japtree, "tpr","fpr")
plot(japperf)
abline(0,1)



