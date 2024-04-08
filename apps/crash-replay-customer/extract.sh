# p_name=$1;
###
 # @Author: Hong.Zhang
 # @Date: 2023-12-05 10:48:06
 # @Description: 
### 
echo '***********************************************************'

echo "Please input the language(such as en-US, id-ID):"

read language

if [ -z $language ]
  then language=en-US
fi

echo "the language is: $language"
echo "extract messages:"

cmd="formatjs extract 'src/**/*.ts*' --ignore 'src/**/*.d.ts' --out-file src/locales/$language/index.json --format src/locales/$language/TMS.js"
echo ${cmd} | awk '{run=$0;system(run)}'

echo "extract completed"
echo '***********************************************************'

