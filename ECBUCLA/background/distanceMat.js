const jsonArr = [[[0,0],[393,500],[47,62],[204,255],[938,1211],[655,843],[661,857],[779,1026],[880,1130],[1061,1315],[861,1075],[514,655],[399,508],[395,485],[479,614],[687,911],[193,288],[721,973],[620,822],[332,408],[215,280],[798,1061],[454,627],[880,1132],[597,770],[1285,1557],[159,214],[193,288],[457,586],[765,1028],[347,429],[457,588],[726,920],[70,99],[166,197],[636,820],[39,49],[865,1110],[865,1110],[978,1252],[116,155],[375,464],[388,492],[958,1177],[298,376],[457,589],[658,851],[364,463],[758,966],[193,288],[765,1003],[559,720],[573,760],[327,491],[189,248],[368,468],[992,1239],[153,204],[782,1051],[912,1180]],[[385,500],[0,0],[392,506],[355,498],[662,813],[535,709],[484,640],[419,564],[587,728],[776,980],[601,769],[440,563],[224,262],[324,383],[199,221],[327,449],[475,648],[361,511],[260,360],[82,97],[259,355],[438,599],[578,734],[606,748],[420,553],[1001,1222],[529,736],[475,648],[240,313],[405,566],[97,118],[237,311],[413,524],[395,516],[309,414],[575,762],[367,521],[727,947],[727,947],[835,1078],[344,480],[125,153],[7,7],[673,842],[237,318],[236,310],[529,701],[303,405],[684,874],[475,648],[405,542],[294,365],[213,299],[451,598],[279,386],[308,411],[708,904],[193,262],[422,590],[636,783]],[[46,62],[399,506],[0,0],[206,266],[937,1204],[654,837],[658,850],[786,1033],[887,1137],[1068,1322],[867,1081],[513,649],[406,515],[402,492],[486,620],[694,917],[200,295],[728,980],[627,828],[339,415],[214,273],[805,1067],[463,634],[887,1138],[594,764],[1291,1564],[154,207],[200,295],[454,579],[772,1035],[354,436],[453,581],[732,926],[73,106],[173,204],[633,813],[34,43],[864,1103],[864,1103],[977,1245],[115,148],[382,471],[395,499],[965,1184],[297,369],[454,582],[657,844],[363,456],[757,959],[200,295],[771,1010],[556,713],[579,767],[336,498],[188,242],[367,462],[999,1246],[152,198],[789,1058],[911,1174]],[[187,273],[372,498],[186,266],[0,0],[915,1195],[697,915],[684,906],[758,1024],[859,1128],[1116,1433],[942,1222],[556,727],[379,509],[375,485],[459,614],[666,908],[312,432],[700,971],[599,819],[311,406],[257,352],[777,1059],[571,770],[859,1129],[620,820],[1341,1675],[286,403],[312,432],[471,621],[744,1026],[326,427],[466,620],[705,918],[223,271],[146,197],[677,891],[128,185],[907,1181],[907,1181],[1020,1323],[158,227],[354,462],[367,490],[1013,1295],[339,448],[465,619],[700,922],[405,534],[800,1037],[312,432],[744,1001],[582,769],[552,758],[444,634],[231,320],[410,540],[1049,1357],[179,233],[761,1049],[889,1165]],[[846,1211],[613,813],[845,1204],[852,1195],[0,0],[292,403],[250,349],[426,578],[150,209],[822,1052],[915,1220],[416,595],[710,1004],[810,1124],[684,963],[273,364],[954,1335],[565,787],[248,328],[575,789],[653,930],[444,599],[1064,1475],[43,65],[311,435],[1153,1441],[885,1259],[954,1335],[407,564],[412,566],[560,768],[487,677],[289,357],[891,1213],[806,1111],[469,665],[787,1122],[197,272],[197,272],[167,219],[739,1055],[537,734],[609,806],[959,1247],[588,834],[488,679],[288,396],[528,748],[320,440],[954,1335],[205,272],[345,486],[440,607],[937,1339],[674,962],[524,742],[795,1035],[687,974],[429,590],[20,30]],[[587,843],[501,709],[586,837],[649,915],[312,403],[0,0],[48,68],[447,615],[299,396],[843,1090],[860,1147],[158,228],[645,917],[748,1013],[619,876],[294,402],[780,1132],[566,754],[273,366],[436,611],[394,563],[465,637],[999,1388],[281,373],[108,155],[1175,1478],[626,892],[780,1132],[204,284],[433,604],[422,591],[284,397],[212,293],[657,942],[638,891],[242,327],[528,755],[272,352],[272,352],[384,494],[480,688],[401,557],[496,701],[931,1220],[329,467],[285,398],[69,93],[269,381],[181,217],[780,1132],[261,341],[143,206],[440,572],[872,1253],[415,595],[266,375],[816,1073],[429,607],[450,628],[286,373]],[[599,857],[453,640],[596,850],[636,906],[274,349],[51,68],[0,0],[399,547],[261,341],[795,1021],[812,1079],[202,276],[597,848],[700,944],[571,807],[246,334],[756,1057],[518,685],[225,297],[388,543],[407,577],[417,568],[951,1320],[243,318],[60,87],[1127,1410],[649,920],[756,1057],[157,215],[385,536],[374,522],[236,329],[165,224],[676,924],[590,823],[293,395],[538,769],[241,307],[241,307],[349,438],[492,702],[353,488],[448,633],[884,1151],[355,479],[237,330],[48,61],[296,392],[233,285],[756,1057],[213,272],[95,137],[392,504],[824,1184],[427,609],[292,387],[768,1004],[441,621],[402,559],[248,318]],[[779,1018],[435,578],[786,1025],[749,1016],[489,578],[467,615],[416,547],[0,0],[414,492],[441,535],[563,741],[528,675],[406,581],[506,702],[380,540],[154,213],[650,913],[176,258],[155,218],[472,610],[653,873],[38,48],[760,1053],[433,513],[426,564],[773,924],[906,1232],[650,913],[432,548],[63,95],[458,589],[479,616],[281,360],[789,1034],[693,920],[642,837],[761,1040],[582,684],[582,684],[657,797],[738,998],[432,556],[430,570],[578,730],[614,815],[478,615],[463,608],[615,785],[648,832],[650,913],[232,306],[319,392],[196,266],[633,917],[673,905],[611,779],[414,518],[587,780],[80,119],[463,548]],[[859,1130],[572,728],[866,1137],[830,1128],[184,209],[306,391],[264,336],[384,492],[0,0],[781,967],[874,1135],[461,592],[669,918],[769,1039],[643,877],[232,279],[913,1250],[524,701],[210,242],[553,722],[666,893],[403,513],[1023,1390],[128,144],[320,403],[1112,1355],[909,1236],[913,1250],[389,492],[371,481],[538,701],[471,606],[248,271],[869,1146],[784,1044],[547,728],[797,1085],[307,385],[307,385],[351,428],[752,1018],[515,667],[567,720],[918,1162],[631,816],[471,605],[302,384],[571,729],[430,553],[913,1250],[167,186],[344,433],[399,521],[896,1254],[687,925],[567,723],[754,950],[668,892],[388,505],[157,179]],[[1014,1315],[729,950],[1021,1322],[1041,1364],[831,1052],[809,1090],[758,1021],[387,535],[756,967],[0,0],[235,322],[876,1149],[655,924],[755,1045],[629,883],[496,688],[826,1086],[363,522],[497,692],[786,1022],[963,1279],[425,584],[876,1194],[775,987],[768,1039],[331,388],[1173,1529],[826,1086],[742,988],[412,581],[775,1019],[796,1046],[623,834],[1009,1310],[896,1161],[990,1310],[1052,1364],[969,1219],[969,1219],[999,1271],[1048,1404],[750,985],[729,955],[207,274],[931,1245],[795,1045],[805,1082],[925,1225],[991,1307],[826,1086],[574,781],[667,866],[512,709],[809,1090],[983,1311],[921,1220],[60,76],[897,1186],[429,605],[805,1022]],[[838,1075],[576,739],[845,1081],[866,1123],[964,1220],[878,1146],[826,1078],[558,764],[889,1135],[260,322],[0,0],[815,1058],[502,713],[602,834],[476,673],[629,856],[651,845],[347,483],[563,769],[633,811],[809,1069],[596,812],[701,953],[908,1155],[769,1004],[483,564],[998,1288],[651,845],[648,812],[583,810],[626,784],[647,811],[715,933],[833,1070],[720,920],[953,1257],[877,1124],[1083,1404],[1083,1404],[1131,1439],[895,1194],[601,750],[575,745],[157,184],[783,1009],[646,809],[874,1139],[826,1065],[1041,1339],[651,845],[706,949],[657,838],[449,615],[634,850],[830,1100],[822,1059],[190,246],[756,926],[600,834],[937,1190]],[[458,655],[419,563],[457,649],[520,727],[453,595],[170,228],[209,276],[533,676],[455,592],[933,1149],[803,1058],[0,0],[588,828],[661,875],[562,787],[406,540],[651,944],[520,689],[373,458],[354,466],[266,375],[551,697],[912,1282],[422,564],[147,196],[1203,1511],[497,704],[651,944],[139,184],[519,664],[340,445],[202,252],[324,431],[528,754],[551,753],[142,195],[399,567],[380,494],[380,494],[493,636],[351,500],[336,456],[414,556],[874,1131],[200,279],[203,253],[177,236],[141,193],[273,350],[651,944],[373,479],[109,146],[395,507],[785,1146],[286,407],[137,187],[906,1132],[300,419],[536,688],[427,565]],[[434,508],[244,262],[441,515],[406,509],[818,1004],[723,916],[672,847],[449,581],[743,918],[737,924],[562,713],[661,827],[0,0],[132,165],[80,105],[483,639],[265,360],[365,493],[417,552],[326,360],[463,572],[487,629],[375,500],[762,938],[615,773],[962,1166],[576,750],[265,360],[484,575],[443,592],[341,380],[481,573],[570,716],[444,524],[287,339],[798,1027],[418,532],[928,1173],[928,1173],[985,1222],[448,574],[366,414],[251,270],[634,786],[481,581],[480,572],[719,908],[547,667],[886,1109],[265,360],[561,732],[502,607],[303,398],[248,364],[483,604],[552,673],[670,848],[273,305],[460,615],[792,973]],[[413,485],[330,383],[420,492],[385,485],[904,1124],[800,1013],[749,944],[535,702],[829,1039],[823,1045],[649,834],[703,875],[118,165],[0,0],[166,226],[569,760],[378,518],[451,614],[503,672],[376,444],[442,549],[573,750],[488,659],[848,1059],[685,858],[1048,1287],[555,726],[378,518],[536,659],[529,712],[391,464],[531,658],[656,836],[423,501],[266,316],[824,1039],[397,509],[992,1251],[992,1251],[1072,1343],[427,550],[419,500],[337,390],[720,907],[486,595],[530,657],[794,1005],[552,682],[947,1185],[378,518],[647,853],[588,728],[389,519],[361,523],[462,581],[557,688],[756,969],[252,281],[546,736],[878,1094]],[[508,614],[212,221],[515,620],[480,614],[787,963],[692,875],[640,807],[418,540],[712,877],[706,883],[531,673],[629,787],[74,105],[174,226],[0,0],[451,598],[324,421],[334,453],[386,511],[295,319],[471,576],[455,589],[434,561],[731,897],[583,732],[931,1125],[651,855],[324,421],[452,534],[411,551],[310,339],[449,533],[538,675],[507,645],[337,415],[767,986],[492,638],[897,1132],[897,1132],[954,1181],[522,679],[335,373],[219,229],[603,745],[450,540],[448,531],[688,868],[516,626],[855,1068],[324,421],[529,691],[471,567],[272,357],[307,425],[492,608],[520,632],[638,807],[347,410],[428,575],[760,933]],[[685,889],[341,449],[692,896],[655,887],[335,364],[313,402],[262,334],[153,213],[260,279],[549,688],[643,856],[434,546],[437,639],[537,760],[411,598],[0,0],[681,971],[292,422],[30,37],[378,481],[559,744],[171,235],[791,1111],[279,299],[272,351],[880,1076],[812,1103],[681,971],[338,419],[139,202],[364,460],[385,487],[127,146],[695,905],[609,803],[548,708],[667,911],[459,541],[459,541],[503,583],[644,869],[338,427],[336,442],[686,883],[520,686],[384,486],[309,394],[521,656],[495,619],[681,971],[78,93],[225,263],[168,243],[664,975],[579,776],[517,650],[522,671],[493,651],[156,226],[309,334]],[[235,288],[503,648],[242,295],[333,432],[1047,1345],[867,1125],[815,1057],[701,913],[991,1278],[916,1086],[715,845],[749,944],[272,360],[400,518],[337,421],[735,971],[0,0],[617,825],[669,884],[443,556],[450,568],[739,961],[305,397],[991,1280],[751,970],[1139,1328],[397,502],[0,0],[602,772],[695,924],[458,577],[597,770],[821,1048],[230,284],[187,229],[875,1108],[276,338],[1058,1363],[1058,1363],[1166,1494],[351,444],[486,612],[498,641],[813,948],[533,664],[596,769],[861,1118],[599,751],[993,1254],[0,0],[812,1064],[713,920],[555,730],[178,262],[425,537],[603,757],[846,1010],[318,394],[712,947],[1020,1315]],[[745,952],[400,511],[752,958],[715,949],[651,787],[576,740],[525,671],[201,258],[576,701],[442,522],[386,483],[537,689],[344,493],[444,614],[318,453],[316,422],[588,825],[0,0],[251,335],[438,544],[618,807],[239,306],[698,965],[595,721],[468,597],[786,936],[872,1166],[588,825],[407,515],[226,303],[424,523],[445,549],[403,499],[755,968],[631,833],[651,850],[727,973],[781,997],[781,997],[818,1005],[704,932],[398,489],[396,504],[458,556],[580,748],[444,548],[572,732],[589,753],[739,932],[588,825],[393,515],[367,444],[161,212],[571,829],[639,838],[586,747],[415,505],[553,714],[243,327],[625,756]],[[624,800],[280,360],[631,807],[594,798],[304,328],[286,366],[235,297],[160,218],[233,242],[556,692],[582,769],[373,457],[377,552],[477,672],[351,511],[24,37],[621,884],[232,335],[0,0],[317,392],[498,655],[178,239],[731,1024],[248,263],[245,314],[887,1081],[751,1014],[621,884],[277,330],[146,207],[303,372],[324,398],[100,110],[634,816],[548,714],[487,619],[606,822],[428,504],[428,504],[472,547],[583,780],[277,338],[275,353],[654,841],[459,597],[323,397],[282,358],[460,567],[468,582],[621,884],[47,56],[164,174],[107,154],[604,888],[518,687],[456,561],[529,675],[432,562],[163,230],[278,298]],[[307,408],[65,97],[314,415],[277,406],[604,789],[453,611],[402,543],[448,597],[548,722],[808,1022],[633,811],[358,466],[289,360],[341,444],[263,319],[356,481],[397,556],[390,544],[289,392],[0,0],[181,263],[467,631],[643,831],[548,723],[337,456],[1033,1264],[451,644],[397,556],[158,215],[434,598],[15,21],[155,214],[393,512],[317,424],[231,322],[496,660],[289,430],[644,849],[644,849],[752,980],[266,388],[43,56],[60,90],[705,884],[159,227],[154,213],[447,604],[225,313],[601,777],[397,556],[433,574],[262,344],[242,331],[516,696],[201,295],[230,319],[741,946],[115,170],[451,622],[578,759]],[[192,280],[268,355],[192,273],[254,352],[724,930],[440,563],[446,577],[654,881],[695,893],[1012,1279],[837,1069],[299,375],[437,572],[433,549],[467,576],[562,766],[385,568],[597,828],[496,677],[208,263],[0,0],[673,916],[646,907],[693,900],[382,490],[1237,1521],[280,392],[385,568],[242,306],[640,883],[223,284],[242,307],[564,732],[262,379],[284,388],[421,539],[133,192],[650,830],[650,830],[763,972],[85,125],[251,319],[263,347],[909,1141],[83,96],[242,309],[444,571],[149,183],[543,686],[385,568],[612,780],[344,440],[448,616],[519,771],[20,32],[153,188],[944,1203],[52,76],[657,907],[697,900]],[[792,1039],[448,599],[799,1046],[762,1037],[502,599],[480,637],[429,568],[33,48],[427,513],[474,584],[596,789],[541,696],[439,629],[539,750],[413,589],[167,235],[683,961],[209,306],[168,239],[485,631],[666,895],[0,0],[793,1101],[446,534],[439,585],[805,972],[919,1254],[683,961],[445,569],[96,144],[471,611],[492,637],[294,381],[802,1055],[726,969],[655,858],[774,1061],[595,705],[595,705],[670,818],[751,1020],[445,577],[443,592],[611,778],[627,836],[491,636],[476,629],[628,806],[662,853],[683,961],[245,327],[332,413],[229,314],[666,965],[686,926],[624,800],[447,566],[600,801],[113,167],[476,569]],[[532,627],[641,734],[541,634],[647,795],[1215,1475],[1120,1388],[1069,1319],[846,1053],[1140,1390],[1001,1194],[801,953],[1046,1282],[417,500],[545,659],[482,561],[880,1111],[340,397],[762,965],[814,1024],[723,831],[747,907],[884,1101],[0,0],[1159,1410],[1012,1245],[1224,1436],[691,841],[340,397],[881,1047],[840,1064],[738,852],[878,1045],[967,1188],[527,622],[501,592],[1167,1446],[570,676],[1326,1645],[1326,1645],[1383,1694],[648,782],[764,886],[648,741],[898,1056],[829,1003],[877,1044],[1116,1380],[895,1090],[1290,1593],[340,397],[958,1204],[899,1079],[700,870],[148,160],[721,875],[900,1095],[932,1118],[633,757],[857,1087],[1189,1445]],[[828,1180],[570,748],[827,1173],[809,1129],[56,65],[274,373],[233,318],[383,513],[107,144],[779,987],[872,1155],[399,564],[667,938],[767,1059],[641,897],[230,299],[911,1270],[522,721],[205,263],[532,723],[635,900],[401,534],[1021,1410],[0,0],[293,405],[1110,1375],[867,1228],[911,1270],[368,493],[369,501],[518,703],[451,608],[246,291],[849,1147],[763,1046],[451,634],[769,1092],[179,241],[179,241],[223,284],[721,1025],[494,669],[566,741],[916,1182],[570,804],[450,607],[270,365],[510,717],[302,409],[911,1270],[162,206],[327,455],[398,542],[894,1274],[656,931],[506,711],[752,970],[647,893],[386,525],[30,35]],[[539,770],[392,553],[536,764],[576,820],[338,435],[115,155],[64,87],[414,564],[311,403],[810,1039],[755,1004],[143,196],[541,774],[640,858],[515,733],[261,351],[696,970],[448,597],[240,314],[328,456],[346,490],[432,585],[895,1246],[307,405],[0,0],[1155,1457],[589,834],[696,970],[96,129],[400,553],[314,435],[176,242],[180,241],[616,838],[530,736],[259,358],[478,682],[305,393],[305,393],[413,524],[432,615],[292,401],[388,546],[827,1077],[295,392],[177,243],[112,148],[235,306],[297,372],[696,970],[228,290],[34,50],[323,415],[768,1110],[367,522],[232,300],[784,1022],[381,534],[417,577],[312,405]],[[1155,1557],[873,1192],[1162,1564],[1183,1606],[1154,1441],[1175,1599],[1124,1530],[710,924],[1079,1355],[323,388],[376,564],[1112,1510],[799,1166],[899,1287],[773,1125],[819,1076],[968,1328],[644,936],[860,1221],[930,1264],[1106,1521],[748,972],[1018,1436],[1098,1375],[1066,1456],[0,0],[1315,1771],[968,1328],[945,1265],[735,969],[924,1237],[944,1263],[1012,1385],[1150,1552],[1037,1403],[1250,1710],[1194,1607],[1291,1608],[1291,1608],[1321,1659],[1192,1646],[898,1203],[873,1197],[247,380],[1080,1462],[944,1262],[1171,1591],[1123,1517],[1338,1792],[968,1328],[896,1169],[954,1290],[746,1068],[951,1332],[1127,1553],[1119,1512],[402,592],[1041,1428],[752,993],[1127,1411]],[[172,214],[566,736],[167,207],[314,403],[984,1259],[701,892],[718,920],[938,1219],[966,1236],[1233,1529],[1032,1288],[560,704],[571,722],[567,699],[651,828],[846,1103],[367,502],[880,1166],[779,1014],[506,644],[309,392],[957,1254],[626,841],[953,1228],[654,834],[1456,1771],[0,0],[367,502],[514,649],[924,1221],[521,665],[513,651],[835,1075],[240,313],[338,411],[568,711],[157,195],[886,1118],[886,1118],[1004,1268],[211,268],[549,700],[562,728],[1130,1391],[354,439],[514,652],[706,899],[411,511],[757,936],[367,502],[883,1123],[616,783],[732,953],[499,705],[284,361],[416,517],[1164,1453],[248,317],[941,1244],[958,1229]],[[235,288],[503,648],[242,295],[333,432],[1047,1345],[867,1125],[815,1057],[701,913],[991,1278],[916,1086],[715,845],[749,944],[272,360],[400,518],[337,421],[735,971],[0,0],[617,825],[669,884],[443,556],[450,568],[739,961],[305,397],[991,1280],[751,970],[1139,1328],[397,502],[0,0],[602,772],[695,924],[458,577],[597,770],[821,1048],[230,284],[187,229],[875,1108],[276,338],[1058,1363],[1058,1363],[1166,1494],[351,444],[486,612],[498,641],[813,948],[533,664],[596,769],[861,1118],[599,751],[993,1254],[0,0],[812,1064],[713,920],[555,730],[178,262],[425,537],[603,757],[846,1010],[318,394],[712,947],[1020,1315]],[[404,586],[207,295],[401,579],[434,621],[433,559],[216,284],[165,215],[436,548],[377,492],[801,988],[650,854],[140,184],[444,575],[498,659],[418,534],[343,419],[554,772],[394,551],[276,330],[142,198],[212,306],[454,569],[798,1047],[377,493],[101,129],[1050,1307],[454,649],[554,772],[0,0],[422,537],[128,177],[43,58],[246,330],[474,639],[388,538],[277,377],[343,498],[408,522],[408,522],[516,653],[297,431],[117,161],[202,287],[722,927],[163,232],[44,59],[210,276],[140,197],[384,494],[554,772],[294,379],[63,78],[246,339],[671,911],[232,338],[136,192],[758,989],[246,350],[439,560],[406,528]],[[785,1007],[441,567],[792,1014],[755,1005],[495,566],[473,604],[422,536],[83,95],[420,481],[486,581],[608,787],[534,664],[418,592],[518,712],[392,551],[160,202],[662,924],[221,303],[161,207],[478,599],[659,862],[121,144],[772,1064],[439,501],[432,553],[818,969],[912,1221],[662,924],[438,536],[0,0],[464,578],[485,605],[288,348],[795,1023],[705,931],[649,825],[767,1028],[619,743],[619,743],[663,785],[744,987],[439,544],[436,559],[623,776],[620,804],[484,604],[470,596],[621,774],[655,821],[662,924],[238,295],[325,381],[202,269],[645,928],[679,894],[617,768],[459,564],[593,769],[17,24],[469,536]],[[321,429],[79,118],[328,436],[291,427],[589,768],[438,591],[386,522],[433,576],[533,701],[803,1019],[631,826],[342,445],[303,380],[355,464],[277,339],[341,460],[411,577],[375,523],[274,372],[14,21],[195,284],[452,611],[657,852],[533,703],[322,435],[1031,1279],[465,665],[411,577],[142,195],[419,578],[0,0],[139,193],[378,491],[331,445],[245,343],[481,640],[303,450],[629,829],[629,829],[737,960],[280,409],[28,35],[74,111],[703,899],[173,247],[138,192],[432,583],[240,334],[586,756],[411,577],[418,553],[247,324],[226,310],[530,716],[215,316],[244,340],[738,961],[129,191],[436,601],[562,738]],[[403,588],[216,311],[401,581],[429,620],[523,677],[298,397],[247,329],[451,603],[464,606],[821,1046],[649,853],[203,252],[441,573],[493,658],[415,533],[359,487],[549,770],[393,549],[292,398],[152,214],[211,307],[470,637],[795,1045],[464,608],[183,242],[1049,1305],[453,651],[549,770],[43,58],[437,604],[138,193],[0,0],[333,445],[469,638],[383,536],[342,446],[342,499],[490,635],[490,635],[598,766],[296,432],[103,141],[212,304],[721,925],[162,233],[1,1],[293,390],[179,254],[447,563],[549,770],[381,493],[145,192],[244,337],[668,909],[231,339],[175,249],[757,987],[245,351],[454,628],[497,647]],[[724,969],[425,532],[731,975],[694,966],[346,357],[225,293],[174,224],[274,360],[271,271],[670,834],[755,933],[326,431],[550,716],[650,836],[524,675],[121,146],[794,1048],[405,499],[100,110],[417,560],[531,732],[292,381],[904,1188],[290,291],[185,241],[1002,1222],[774,1075],[794,1048],[253,330],[260,348],[403,540],[336,445],[0,0],[734,985],[648,883],[435,584],[662,924],[405,515],[405,515],[513,646],[616,857],[380,506],[420,524],[827,1005],[496,654],[335,444],[222,285],[436,568],[407,510],[794,1048],[88,85],[159,170],[279,318],[777,1052],[551,763],[432,562],[644,817],[533,731],[277,372],[319,327]],[[80,99],[413,516],[83,106],[224,271],[957,1213],[735,942],[725,924],[799,1042],[901,1146],[1066,1310],[866,1070],[594,754],[419,524],[415,501],[488,645],[707,926],[198,284],[742,989],[640,837],[353,424],[295,379],[818,1077],[459,622],[901,1147],[661,838],[1290,1552],[237,313],[198,284],[512,639],[785,1044],[368,445],[507,638],[746,936],[0,0],[186,213],[716,918],[117,148],[945,1209],[945,1209],[1058,1351],[196,254],[396,480],[408,508],[964,1172],[378,475],[506,637],[739,950],[444,562],[838,1065],[198,284],[785,1019],[623,787],[593,776],[332,486],[270,347],[448,567],[997,1235],[220,251],[802,1067],[930,1183]],[[167,197],[310,414],[174,204],[139,197],[853,1111],[673,891],[622,823],[702,920],[797,1044],[990,1263],[816,1053],[576,753],[253,339],[249,316],[332,415],[604,825],[159,229],[618,833],[537,736],[249,322],[280,388],[715,975],[418,567],[797,1046],[558,736],[1215,1505],[309,439],[159,229],[409,538],[696,931],[264,343],[404,536],[643,834],[177,213],[0,0],[697,917],[151,221],[865,1129],[865,1129],[973,1260],[181,263],[292,378],[305,406],[887,1125],[359,474],[403,535],[667,883],[425,560],[820,1064],[159,229],[682,917],[520,686],[490,674],[291,432],[254,356],[430,566],[923,1188],[125,160],[713,955],[827,1081]],[[580,820],[551,762],[578,813],[642,891],[507,665],[260,327],[308,395],[649,837],[567,728],[1049,1311],[944,1258],[141,195],[729,1027],[783,1039],[704,986],[513,694],[777,1108],[637,850],[489,619],[491,670],[388,539],[667,858],[1034,1446],[476,634],[264,358],[1344,1710],[521,711],[777,1108],[279,377],[635,826],[479,639],[342,446],[432,584],[650,918],[673,917],[0,0],[519,731],[317,407],[317,407],[440,558],[473,664],[460,606],[546,754],[1016,1330],[323,443],[342,447],[268,335],[263,357],[189,225],[777,1108],[480,633],[226,308],[511,669],[907,1310],[408,571],[266,361],[1023,1294],[422,583],[652,849],[480,635]],[[36,49],[399,521],[32,43],[144,185],[875,1122],[591,755],[595,769],[786,1048],[844,1085],[1098,1364],[897,1124],[450,567],[407,532],[403,509],[487,638],[694,932],[231,338],[728,994],[627,843],[339,430],[151,192],[805,1082],[490,676],[844,1092],[531,682],[1321,1607],[143,195],[231,338],[392,498],[772,1049],[354,450],[391,499],[713,924],[104,148],[174,221],[570,731],[0,0],[801,1022],[801,1022],[914,1164],[52,67],[382,485],[394,514],[995,1227],[234,288],[392,501],[595,763],[300,375],[694,878],[231,338],[771,1025],[493,632],[579,782],[363,540],[126,160],[304,380],[1028,1289],[90,116],[789,1073],[848,1092]],[[773,1110],[672,947],[773,1103],[835,1181],[199,272],[248,352],[219,307],[556,684],[275,385],[947,1228],[1031,1385],[344,494],[816,1155],[919,1251],[790,1114],[398,541],[966,1398],[691,963],[373,504],[607,849],[581,830],[574,705],[1170,1626],[168,241],[279,393],[1279,1617],[804,1118],[966,1398],[375,522],[537,743],[593,829],[455,635],[383,515],[843,1209],[809,1129],[283,407],[714,1022],[0,0],[0,0],[146,189],[666,955],[572,795],[667,939],[1084,1423],[516,734],[456,637],[255,359],[456,647],[134,183],[966,1398],[330,448],[314,444],[566,783],[1043,1491],[601,861],[452,641],[920,1211],[615,873],[554,766],[173,242]],[[773,1110],[672,947],[773,1103],[835,1181],[199,272],[248,352],[219,307],[556,684],[275,385],[947,1228],[1031,1385],[344,494],[816,1155],[919,1251],[790,1114],[398,541],[966,1398],[691,963],[373,504],[607,849],[581,830],[574,705],[1170,1626],[168,241],[279,393],[1279,1617],[804,1118],[966,1398],[375,522],[537,743],[593,829],[455,635],[383,515],[843,1209],[809,1129],[283,407],[714,1022],[0,0],[0,0],[146,189],[666,955],[572,795],[667,939],[1084,1423],[516,734],[456,637],[255,359],[456,647],[134,183],[966,1398],[330,448],[314,444],[566,783],[1043,1491],[601,861],[452,641],[920,1211],[615,873],[554,766],[173,242]],[[892,1252],[770,1032],[891,1245],[954,1323],[157,219],[367,494],[334,438],[583,797],[307,428],[979,1271],[1072,1439],[463,636],[867,1222],[967,1343],[841,1181],[430,583],[1085,1540],[722,1005],[405,547],[722,980],[699,972],[601,818],[1221,1694],[200,284],[394,524],[1310,1659],[903,1268],[1085,1540],[490,653],[569,785],[708,960],[570,766],[446,575],[962,1351],[924,1260],[385,558],[833,1164],[126,189],[126,189],[0,0],[785,1097],[686,926],[766,1025],[1116,1466],[634,876],[571,768],[371,485],[574,789],[236,333],[1085,1540],[362,490],[428,575],[598,826],[1094,1558],[720,1003],[571,783],[952,1254],[734,1016],[586,809],[177,249]],[[107,155],[367,480],[106,148],[169,227],[822,1055],[539,688],[545,702],[753,1006],[794,1018],[1110,1404],[936,1194],[398,500],[432,574],[428,550],[512,679],[661,891],[300,444],[696,953],[594,802],[307,388],[99,125],[772,1041],[561,782],[791,1025],[481,615],[1336,1646],[194,268],[300,444],[341,431],[739,1008],[322,409],[341,432],[663,857],[177,254],[199,263],[520,664],[48,67],[749,955],[749,955],[862,1097],[0,0],[350,444],[362,472],[1008,1266],[182,221],[341,434],[543,696],[248,308],[642,811],[300,444],[711,905],[443,565],[547,741],[434,646],[74,93],[252,313],[1043,1328],[37,49],[756,1032],[796,1025]],[[347,464],[105,153],[354,471],[317,462],[564,734],[403,544],[351,476],[406,542],[508,667],[776,985],[604,792],[321,411],[327,414],[381,500],[301,373],[313,427],[437,612],[348,489],[247,338],[40,56],[221,319],[424,577],[681,886],[508,669],[299,401],[1004,1245],[492,700],[437,612],[117,161],[391,544],[26,35],[104,141],[351,457],[357,480],[271,378],[460,606],[329,485],[608,801],[608,801],[716,932],[306,444],[0,0],[100,146],[676,865],[200,283],[103,140],[409,549],[266,369],[565,722],[437,612],[391,519],[220,290],[199,276],[554,750],[241,351],[270,375],[711,927],[156,226],[408,568],[537,704]],[[378,492],[5,7],[385,499],[348,490],[655,806],[528,701],[477,633],[412,557],[580,720],[769,955],[595,745],[433,556],[229,270],[329,390],[203,229],[320,442],[468,641],[355,504],[253,353],[75,90],[252,347],[431,592],[583,741],[599,741],[413,546],[995,1197],[522,728],[468,641],[233,305],[398,559],[91,111],[230,304],[406,517],[388,508],[302,406],[569,754],[360,514],[720,939],[720,939],[828,1070],[337,472],[119,146],[0,0],[666,817],[230,311],[229,303],[523,694],[297,398],[677,867],[468,641],[398,534],[287,357],[206,291],[456,606],[272,379],[301,403],[702,879],[186,254],[415,582],[629,776]],[[910,1177],[625,812],[917,1184],[937,1226],[967,1247],[927,1219],[876,1150],[523,730],[892,1162],[228,274],[131,184],[865,1130],[551,786],[651,907],[525,745],[632,883],[722,948],[397,556],[612,841],[682,884],[859,1141],[561,778],[772,1056],[911,1182],[819,1076],[328,380],[1069,1391],[722,948],[698,885],[548,776],[676,857],[697,883],[765,1005],[905,1172],[792,1023],[1003,1329],[949,1227],[1105,1414],[1105,1414],[1135,1466],[944,1266],[651,823],[625,817],[0,0],[833,1082],[696,882],[924,1211],[876,1137],[1091,1412],[722,948],[710,976],[706,910],[498,687],[705,952],[879,1173],[872,1132],[154,212],[793,1048],[565,800],[941,1217]],[[258,376],[228,318],[257,369],[320,448],[641,834],[358,467],[377,479],[600,801],[636,816],[970,1245],[797,1032],[216,279],[465,619],[461,595],[427,540],[508,686],[451,664],[542,748],[441,597],[168,227],[65,96],[619,836],[712,1003],[610,804],[312,392],[1197,1485],[308,439],[451,664],[176,232],[586,803],[183,247],[175,233],[505,654],[328,475],[351,474],[338,443],[199,288],[568,734],[568,734],[680,876],[151,221],[211,283],[224,311],[869,1105],[0,0],[176,235],[361,475],[66,87],[460,590],[451,664],[553,703],[274,342],[393,536],[585,867],[86,128],[70,92],[905,1167],[100,140],[603,827],[614,804]],[[404,589],[216,310],[401,582],[428,619],[524,679],[299,398],[248,330],[450,601],[463,605],[820,1045],[648,852],[204,253],[440,572],[492,657],[414,531],[358,486],[548,769],[392,548],[291,397],[151,213],[212,309],[469,636],[794,1044],[463,607],[184,243],[1048,1304],[454,652],[548,769],[44,59],[436,603],[137,192],[1,1],[332,444],[468,637],[382,535],[343,448],[343,501],[491,637],[491,637],[599,768],[297,434],[102,140],[211,303],[720,924],[162,235],[0,0],[294,391],[180,255],[448,564],[548,769],[381,492],[146,193],[244,336],[667,908],[232,340],[176,250],[756,986],[246,352],[453,627],[498,648]],[[591,851],[495,701],[590,844],[653,922],[309,396],[69,93],[45,61],[444,608],[296,389],[840,1082],[856,1139],[165,236],[642,909],[743,1005],[616,868],[291,394],[784,1139],[562,746],[270,358],[431,604],[398,571],[462,629],[996,1381],[278,365],[105,148],[1171,1471],[632,899],[784,1139],[199,276],[430,596],[417,583],[279,390],[209,285],[660,950],[633,883],[249,335],[531,763],[275,354],[275,354],[383,485],[484,696],[395,549],[491,694],[928,1212],[333,475],[280,391],[0,0],[273,388],[189,224],[784,1139],[257,333],[142,202],[437,565],[869,1245],[419,603],[269,383],[813,1065],[432,615],[447,620],[283,366]],[[317,463],[288,405],[317,456],[379,534],[575,748],[292,381],[310,392],[628,785],[570,729],[994,1225],[836,1107],[150,193],[524,706],[520,682],[487,626],[536,656],[510,751],[580,804],[469,567],[228,313],[125,183],[647,806],[771,1090],[544,717],[246,306],[1236,1560],[359,511],[510,751],[148,197],[615,774],[243,334],[187,254],[439,568],[387,562],[410,560],[272,357],[258,375],[501,647],[501,647],[614,789],[210,308],[271,369],[283,398],[908,1180],[60,87],[188,255],[295,388],[0,0],[394,503],[510,751],[487,616],[208,255],[431,591],[644,954],[145,214],[4,6],[943,1242],[159,226],[632,797],[548,718]],[[674,966],[635,874],[674,959],[737,1037],[318,440],[158,217],[206,285],[605,832],[394,553],[1002,1307],[1007,1340],[245,350],[792,1109],[878,1185],[767,1069],[453,619],[867,1254],[700,932],[432,582],[571,777],[482,686],[624,853],[1129,1593],[287,409],[267,372],[1333,1695],[671,936],[867,1254],[356,494],[591,821],[556,756],[419,563],[371,510],[744,1065],[768,1064],[149,225],[615,878],[128,182],[128,182],[251,333],[568,811],[537,722],[630,867],[1079,1412],[417,590],[420,564],[166,224],[357,503],[0,0],[867,1254],[419,558],[301,422],[574,751],[1001,1457],[503,718],[353,498],[975,1290],[516,730],[609,845],[291,410]],[[235,288],[503,648],[242,295],[333,432],[1047,1345],[867,1125],[815,1057],[701,913],[991,1278],[916,1086],[715,845],[749,944],[272,360],[400,518],[337,421],[735,971],[0,0],[617,825],[669,884],[443,556],[450,568],[739,961],[305,397],[991,1280],[751,970],[1139,1328],[397,502],[0,0],[602,772],[695,924],[458,577],[597,770],[821,1048],[230,284],[187,229],[875,1108],[276,338],[1058,1363],[1058,1363],[1166,1494],[351,444],[486,612],[498,641],[813,948],[533,664],[596,769],[861,1118],[599,751],[993,1254],[0,0],[812,1064],[713,920],[555,730],[178,262],[425,537],[603,757],[846,1010],[318,394],[712,947],[1020,1315]],[[753,982],[409,542],[760,989],[723,980],[258,272],[270,341],[219,272],[221,306],[187,186],[617,781],[711,949],[371,479],[505,732],[605,853],[479,691],[68,93],[749,1064],[360,515],[43,56],[446,574],[576,780],[239,327],[859,1204],[202,206],[229,290],[949,1169],[818,1123],[749,1064],[298,379],[207,295],[432,553],[381,493],[84,85],[763,998],[677,896],[479,633],[707,972],[381,448],[381,448],[425,490],[661,905],[406,519],[404,534],[754,976],[540,703],[380,492],[266,333],[481,616],[452,558],[749,1064],[0,0],[243,256],[236,335],[732,1068],[596,812],[477,610],[590,764],[561,744],[224,318],[231,241]],[[504,720],[269,365],[502,713],[541,769],[377,486],[153,206],[102,137],[319,392],[331,433],[719,866],[638,838],[108,146],[423,607],[523,728],[397,567],[226,263],[661,920],[344,444],[159,174],[247,344],[312,440],[337,413],[777,1079],[331,435],[38,50],[1038,1290],[555,783],[661,920],[62,78],[305,381],[233,324],[142,192],[134,170],[581,787],[495,686],[225,308],[443,632],[343,444],[343,444],[451,575],[397,565],[208,290],[264,357],[709,910],[261,342],[142,193],[153,202],[201,255],[313,390],[661,920],[222,256],[0,0],[218,262],[650,943],[332,472],[197,250],[692,849],[346,484],[322,405],[350,455]],[[584,739],[239,299],[591,746],[554,737],[516,607],[439,558],[388,490],[206,266],[441,521],[576,709],[476,615],[400,507],[270,398],[370,519],[244,357],[181,243],[514,730],[149,212],[114,154],[277,331],[457,594],[244,314],[624,870],[460,542],[331,415],[876,1068],[711,953],[514,730],[270,334],[194,269],[263,310],[284,337],[267,318],[594,755],[508,653],[514,669],[566,761],[644,815],[644,815],[683,826],[543,719],[237,276],[235,291],[548,687],[419,536],[283,336],[435,551],[452,571],[602,751],[514,730],[259,335],[230,262],[0,0],[497,734],[478,626],[449,566],[549,692],[392,501],[211,292],[490,577]],[[401,491],[510,598],[410,498],[516,659],[1084,1339],[989,1252],[938,1183],[715,917],[1010,1254],[930,1090],[730,850],[915,1146],[286,364],[414,523],[351,425],[749,975],[209,262],[632,829],[683,888],[592,696],[616,771],[753,965],[144,160],[1028,1274],[881,1109],[1154,1332],[560,705],[209,262],[750,911],[709,928],[608,716],[747,909],[836,1052],[396,486],[371,457],[1037,1310],[440,540],[1195,1509],[1195,1509],[1252,1558],[517,646],[633,750],[517,606],[828,952],[699,867],[746,908],[986,1244],[765,954],[1159,1457],[209,262],[827,1068],[769,943],[569,734],[0,0],[590,739],[769,959],[861,1014],[502,621],[726,951],[1058,1309]],[[172,248],[293,386],[171,242],[234,320],[749,962],[466,595],[472,609],[680,913],[720,925],[1037,1311],[862,1100],[325,407],[463,604],[459,581],[492,608],[588,797],[365,537],[622,860],[521,708],[233,295],[25,32],[699,948],[626,875],[718,931],[407,522],[1262,1553],[259,361],[365,537],[268,338],[666,915],[248,316],[267,339],[589,763],[242,347],[264,356],[446,571],[113,160],[676,861],[676,861],[788,1003],[65,93],[276,351],[289,379],[934,1173],[108,128],[268,340],[469,603],[174,214],[568,718],[365,537],[637,812],[369,472],[474,647],[499,739],[0,0],[178,220],[970,1235],[32,44],[683,938],[723,932]],[[321,468],[292,411],[321,462],[383,540],[571,742],[287,375],[306,387],[624,779],[566,723],[989,1220],[832,1101],[146,187],[528,711],[524,688],[490,632],[531,651],[514,757],[576,798],[465,562],[231,319],[129,188],[642,801],[775,1095],[539,711],[242,300],[1232,1554],[362,517],[514,757],[144,192],[610,768],[247,340],[183,249],[435,562],[391,567],[414,566],[275,361],[262,380],[497,641],[497,641],[610,783],[214,313],[275,375],[287,403],[904,1174],[64,92],[183,250],[291,383],[4,6],[390,498],[514,757],[483,610],[204,250],[427,586],[648,959],[149,220],[0,0],[939,1236],[163,232],[627,792],[544,712]],[[954,1239],[671,874],[961,1246],[981,1288],[813,1035],[791,1073],[740,1004],[369,518],[738,950],[69,76],[174,246],[858,1132],[597,848],[697,969],[571,807],[478,671],[766,1010],[345,505],[479,675],[728,946],[904,1203],[407,566],[816,1118],[757,970],[750,1022],[401,464],[1113,1453],[766,1010],[724,971],[394,564],[722,919],[743,945],[606,817],[949,1235],[835,1085],[973,1293],[992,1289],[951,1202],[951,1202],[981,1254],[990,1328],[696,885],[671,879],[164,212],[878,1144],[742,944],[788,1065],[907,1208],[973,1290],[766,1010],[556,764],[649,849],[494,692],[749,1014],[925,1235],[903,1202],[0,0],[839,1110],[411,588],[787,1005]],[[140,204],[193,265],[140,198],[158,233],[736,962],[470,607],[476,621],[579,791],[680,895],[936,1189],[762,979],[329,419],[232,305],[228,281],[312,410],[487,676],[284,394],[521,738],[420,587],[132,173],[62,76],[598,826],[543,732],[680,897],[411,534],[1162,1431],[227,317],[284,394],[272,350],[565,793],[148,194],[271,351],[526,685],[198,251],[118,160],[450,583],[81,116],[680,873],[680,873],[792,1016],[33,49],[176,229],[188,258],[833,1051],[112,140],[286,386],[473,615],[178,226],[572,730],[284,394],[565,769],[373,484],[373,526],[416,597],[36,44],[182,232],[869,1114],[0,0],[582,817],[710,932]],[[809,1030],[465,590],[816,1037],[779,1028],[519,590],[497,628],[446,559],[107,119],[444,505],[510,605],[632,810],[558,687],[442,615],[542,736],[416,575],[184,226],[686,947],[245,327],[185,230],[502,622],[683,886],[145,167],[796,1087],[463,525],[456,577],[841,993],[936,1245],[686,947],[462,560],[24,24],[488,602],[509,628],[311,372],[819,1046],[729,955],[672,849],[791,1052],[643,766],[643,766],[687,809],[768,1011],[462,568],[460,583],[647,800],[644,827],[508,627],[493,620],[645,797],[679,845],[686,947],[262,318],[349,405],[226,292],[669,951],[703,917],[641,792],[483,588],[617,792],[0,0],[493,560]],[[826,1180],[593,783],[825,1174],[832,1165],[26,30],[272,373],[231,318],[406,548],[130,179],[802,1022],[895,1190],[397,565],[690,973],[790,1094],[664,933],[253,334],[934,1305],[545,756],[228,298],[555,759],[633,900],[424,569],[1044,1445],[23,35],[291,405],[1133,1411],[865,1229],[934,1305],[387,534],[392,536],[541,738],[467,647],[269,327],[872,1183],[786,1081],[449,635],[767,1092],[177,242],[177,242],[194,249],[719,1025],[517,704],[589,776],[939,1217],[568,804],[468,648],[268,366],[508,718],[300,410],[934,1305],[185,241],[325,455],[420,577],[917,1309],[654,932],[504,712],[775,1005],[668,944],[409,560],[0,0]]]
