const recipes={

  refresh:{name:'轻盈桂花仙草乌龙',reason:'28°C午后，乌龙茶感清晰，嫩仙草提供轻嚼感；微糖减少甜腻，桂花增加香气记忆点。',tea:'桂香乌龙',sugar:'微糖',topping:'嫩仙草',price:16,kcal:210,score:92,taste:[4.5,2,3,1.5]},
  treat:{name:'黑糖糯糯仙草乳',reason:'需要解馋时，黑糖香与糯米小料带来满足感；中杯规格控制总量，避免口感过度厚重。',tea:'醇香红茶',sugar:'三分糖',topping:'糯米小丸子',price:19,kcal:360,score:89,taste:[3,3.5,4.5,4]},
  light:{name:'山楂啵啵茉莉',reason:'茉莉茶底提供清香，山楂微酸拉高层次；低糖搭配少量脆啵啵，保留口感同时控制负担。',tea:'茉莉绿茶',sugar:'微糖',topping:'脆啵啵',price:15,kcal:175,score:90,taste:[4,1.5,2.5,1]},
  full:{name:'燕麦芋圆轻乳茶',reason:'燕麦与小芋圆提供餐间饱腹感，轻乳茶底保持顺滑；适合需要续航但不想吃甜点的时段。',tea:'轻乳红茶',sugar:'三分糖',topping:'小芋圆+燕麦',price:20,kcal:330,score:88,taste:[3,3,4,3.5]},
  rich:{name:'可可仙草厚乳',reason:'可可与厚乳构成浓郁主体，仙草降低单一甜腻感；推荐少糖以保留可可香气和尾韵。',tea:'可可厚乳',sugar:'少糖',topping:'嫩仙草',price:21,kcal:395,score:87,taste:[1.5,3.5,3,5]},
  surprise:{name:'青提米麻薯乌龙',reason:'青提果香与焙火乌龙形成明亮反差，米麻薯增加柔软嚼感，是偏好范围内的新鲜探索。',tea:'焙火乌龙',sugar:'三分糖',topping:'米麻薯',price:19,kcal:285,score:86,taste:[4,2.5,3.5,2]}
};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let current=recipes.refresh;let swapIndex=0;
function icons(){if(window.lucide)lucide.createIcons()}
function showView(name){$$('.view').forEach(v=>v.classList.remove('active'));$(`#${name}-view`).classList.add('active');$$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===name));window.scrollTo({top:0,behavior:'smooth'})}
function showStep(id,index){$$('.step-panel').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');$$('.steps span').forEach((s,i)=>s.classList.toggle('active',i===index))}
function selectedNeeds(){return $$('.need-card.selected').map(x=>x.dataset.need)}
function renderRecipe(recipe){current=recipe;$('#recipe-name').textContent=recipe.name;$('#share-recipe-name').textContent=recipe.name;$('#custom-name').value=recipe.name;$('#name-count').textContent=recipe.name.length;$('#recipe-reason').textContent=recipe.reason;$('#tea-base').textContent=recipe.tea;$('#sugar-level').textContent=recipe.sugar;$('#toppings').textContent=recipe.topping;$('#price').textContent=`${recipe.price}元`;$('#action-price').textContent=`${recipe.price}元`;$('#calories').textContent=`约 ${recipe.kcal} kcal`;$('#match-score').textContent=recipe.score;['tea','sweet','chew','rich'].forEach((key,i)=>{const item=$(`#taste-${key}`);item.textContent=recipe.taste[i].toFixed(1);item.nextElementSibling.firstElementChild.style.width=`${recipe.taste[i]*20}%`})}
function chooseRecipe(){const needs=selectedNeeds();let key=needs.find(n=>n!=='light')||needs[0]||'refresh';if($('#no-dairy').checked&&['rich','full'].includes(key))key='light';renderRecipe(recipes[key]);showStep('#result-step',1)}
function toast(message){$('#toast span').textContent=message;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2200)}
$$('.tab').forEach(t=>t.addEventListener('click',()=>showView(t.dataset.view)));
$$('.need-card').forEach(card=>card.addEventListener('click',()=>{if(card.classList.contains('selected')){if(selectedNeeds().length>1)card.classList.remove('selected')}else if(selectedNeeds().length<2)card.classList.add('selected');else toast('最多选择两个饮用目标')}));
$('#budget').addEventListener('input',e=>$('#budget-value').textContent=`${e.target.value}元`);$('#generate').addEventListener('click',chooseRecipe);$('#restart').addEventListener('click',()=>showStep('#need-step',0));
$('#swap').addEventListener('click',()=>{const keys=Object.keys(recipes);swapIndex=(swapIndex+1)%keys.length;renderRecipe(recipes[keys[swapIndex]]);toast('已根据你的偏好更换配方')});
$('#adopt').addEventListener('click',()=>{showStep('#create-step',2);$('#recipe-id').textContent=`CD${Math.floor(1000+Math.random()*8999)}`});
$('#custom-name').addEventListener('input',e=>{$('#name-count').textContent=e.target.value.length;$('#share-recipe-name').textContent=e.target.value||current.name});
$('#save').addEventListener('click',()=>toast('配方已保存到会员账户'));
$('#share').addEventListener('click',async()=>{const url=`${location.href.split('#')[0]}#recipe=${encodeURIComponent($('#custom-name').value)}`;try{await navigator.clipboard.writeText(url);$('#share-status').textContent='分享链接已复制，可邀请好友复刻。'}catch{$('#share-status').textContent='配方卡已生成，可截图分享。'}toast('分享卡生成成功')});
$('#refresh-context').addEventListener('click',()=>{const temp=26+Math.floor(Math.random()*6);$('#temperature').textContent=`${temp}°C`;toast('场景信息已更新')});
$$('.segmented button').forEach(b=>b.addEventListener('click',()=>{$$('.segmented button').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast(`已按${b.textContent}排序`)}));
$('.dashboard-actions .primary-button').addEventListener('click',()=>toast('演示报告已生成'));
renderRecipe(current);icons();
